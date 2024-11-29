import { Entity, Column, ManyToOne } from 'typeorm';
import { Side } from '../../order/enum/side.enum';
import { Type } from '../../order/enum/type.enum';
import { UserEntity } from './user.entity';
import { BaseEntity } from '../../../shared/base/base.entity';

@Entity('orders')
export class OrderEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  tokenA: string;

  @Column({ type: 'varchar' })
  tokenB: string;

  @Column({ type: 'enum', enum: Side })
  side: Side;

  @Column({ type: 'enum', enum: Type })
  type: Type;

  @Column({ name: 'amount_a', type: 'decimal', precision: 18, scale: 8 })
  amountA: number;

  @Column({ name: 'amount_b', type: 'decimal', precision: 18, scale: 8 })
  amountB: number;

  @Column({ type: 'decimal', precision: 18, scale: 8, default: 0 })
  filled: number;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;
}
