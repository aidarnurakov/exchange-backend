import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { UserStatusEnum } from '../../user/enum/status.enum';
import { OrderEntity } from './order.entity';
import { encryptPassword } from '../../../shared/utils';
import { BaseEntity } from '../../../shared/base/base.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  username: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.INITIAL,
  })
  status: UserStatusEnum;

  @OneToMany(() => OrderEntity, (order) => order.user, { cascade: true })
  orders: OrderEntity[] = [];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await encryptPassword(this.password);
  }
}
