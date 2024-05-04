import { Controller, Get, Delete, Put, Body, Req, Post, UseGuards, HttpStatus } from '@nestjs/common';

// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';

import { CartService, CartItemService } from './services';
import { DataSource } from 'typeorm';
import { Cart, CartStatus } from './entities';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private dataSource: DataSource,
    private cartService: CartService,
    private cartItemService: CartItemService,
    private orderService: OrderService
  ) {}

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Req() req: AppRequest) {
    const cart = await this.cartService.findOrCreateByUserId(getUserIdFromRequest(req));

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart },
      // data: { cart, total: calculateCartTotal(cart) },
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(@Req() req: AppRequest, @Body() body) {
    // TODO: validate body payload...
    const userId = getUserIdFromRequest(req);
    const { action, productId } = body;

    let cart = await this.cartService.findOrCreateByUserId(userId);

    if (action === 'inc') {
      await this.cartItemService.increaseCountOrAdd(cart, productId);
    }
    if (action === 'dec') {
      await this.cartItemService.decreaseCountOrDelete(cart, productId);
    }

    cart = await this.cartService.findById(cart.id);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        cart,
        // total: calculateCartTotal(cart),
      },
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Delete()
  async clearUserCart(@Req() req: AppRequest) {
    await this.cartService.removeByUserId(getUserIdFromRequest(req));

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Post('checkout')
  async checkout(@Req() req: AppRequest, @Body() body) {
    const userId = getUserIdFromRequest(req);
    const cart = await this.cartService.findByUserId(userId);

    if (!cart?.Items?.length) {
      const statusCode = HttpStatus.BAD_REQUEST;
      req.statusCode = statusCode;
      return {
        statusCode,
        message: 'Cart is empty',
      };
    }

    const order = await this.dataSource.transaction(async (transactionEntityManager) => {
      await this.cartService.completeByUserId(transactionEntityManager, userId);
      return await this.orderService.create(transactionEntityManager, cart);
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order },
    };
  }
}
