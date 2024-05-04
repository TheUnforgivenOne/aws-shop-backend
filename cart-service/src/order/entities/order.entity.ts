import { Cart } from 'src/cart/entities';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

enum OrderStatus {
  CREATED = 'CREATED',
  PAYMENT_STARTED = 'PENDING_PAYMENT',
  PAYMENT_COMPLETED = 'PAYMENT_COMPLETED',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
}

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'user_id', nullable: false })
  userId: string;

  @OneToOne(() => Cart)
  @JoinColumn({ name: 'cart_id' })
  Cart: Cart;

  @Column({ type: 'json' })
  payment: object;

  @Column({ type: 'json' })
  delivery: object;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.CREATED })
  status: OrderStatus;

  @Column({ type: 'int', nullable: true })
  total: number;
}
