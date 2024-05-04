import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart as CartType } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    return await this.cartsRepository.findOneBy({ userId });
  }

  async createByUserId(userId: string): Promise<Cart> {
    const newCart = new Cart();
    newCart.userId = userId;
    await newCart.save();

    return newCart;
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return await this.createByUserId(userId);
  }

  updateByUserId(userId: string, { items }: CartType) {
    // const { id, ...rest } = this.findOrCreateByUserId(userId);
    // const updatedCart = {
    //   id,
    //   ...rest,
    //   items: [...items],
    // };
    // this.userCarts[userId] = { ...updatedCart };
    // return { ...updatedCart };
  }

  async removeByUserId(userId: string): Promise<void> {
    await this.cartsRepository.delete({ userId });
  }
}
