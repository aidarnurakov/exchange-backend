import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Side } from '../../orders/enums/side.enum';
import { Type } from '../../orders/enums/type.enum';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column()
  user: string;
}
