import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entities';
import { CartItemService } from './cartItem.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>,
    @Inject(forwardRef(() => CartItemService))
    private cartItemService: CartItemService
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    return await this.cartsRepository.findOne({ where: { userId }, relations: { Items: true } });
  }

  async findById(cartId: string): Promise<Cart> {
    return await this.cartsRepository.findOne({ where: { id: cartId }, relations: { Items: true } });
  }

  async createByUserId(userId: string): Promise<Cart> {
    const { id } = await this.cartsRepository.create({ userId }).save();

    return this.findById(id);
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return await this.createByUserId(userId);
  }

  async updateByUserId(
    userId: string,
    { productId, action }: { productId: string; action: 'inc' | 'dec' }
  ): Promise<Cart> {
    let cart = await this.findOrCreateByUserId(userId);

    if (action === 'inc') {
      await this.cartItemService.increaseCountOrAdd(cart, productId);
    }
    if (action === 'dec') {
      await this.cartItemService.decreaseCountOrDelete(cart, productId);
    }

    cart = await this.findById(cart.id);

    return cart;
  }

  async removeByUserId(userId: string): Promise<void> {
    await this.cartsRepository.delete({ userId });
  }
}
