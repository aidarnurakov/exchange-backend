import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tokenA: string;

  @Column()
  tokenB: string;

  @Column()
  user: string;

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  amountA: number;

  @Column({ type: 'decimal', precision: 18, scale: 8, nullable: true })
  amountB: number;

  @Column()
  type: 'limit' | 'market';

  @Column()
  side: 'buy' | 'sell';

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  filled: number;

  @Column({ default: true })
  active: boolean;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  matchedAt: Date;
}
