
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Shop } from './shop.entity';
import { Review } from './review.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'shop_id', type: 'uuid' })
  shopId: string;

  @ManyToOne(() => Shop, (shop) => shop.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  @Column({ length: 150 })
  title: string;

  @Column({ length: 100 })
  category: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ length: 30 })
  condition: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
}
