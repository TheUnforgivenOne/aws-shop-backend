import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Cart, CartStatus } from '../entities';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>
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

  // Transactional method
  async completeByUserId(entityManager: EntityManager, userId: string): Promise<void> {
    await entityManager.update(Cart, { userId }, { status: CartStatus.ORDERED });
  }

  async removeByUserId(userId: string): Promise<void> {
    await this.cartsRepository.delete({ userId });
  }
}
