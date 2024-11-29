import { Entity, Column, BaseEntity, ManyToOne } from 'typeorm';
import { Side } from '../../orders/enum/side.enum';
import { Type } from '../../orders/enum/type.enum';
import { UserEntity } from './user.entity';

@Entity('orders')
export class OrderEntity extends BaseEntity {
  @Column()
  tokenA: string;

  @Column()
  tokenB: string;

  @Column({ type: 'enum', enum: Side })
  side: Side;

  @Column({ type: 'enum', enum: Type })
  type: Type;

  @Column({ type: 'decimal' })
  amountA: number;

  @Column({ type: 'decimal', nullable: true })
  amountB: number;

  @Column({ type: 'decimal' })
  filled: number;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;
}
