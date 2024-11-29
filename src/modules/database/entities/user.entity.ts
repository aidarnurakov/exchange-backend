import { BaseEntity, BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { UserStatusEnum } from '../../user/enum/status.enum';
import { OrderEntity } from './order.entity';
import { encryptPassword } from '../../../shared/utils';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ enum: UserStatusEnum, default: UserStatusEnum.INITIAL })
  status: UserStatusEnum;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await encryptPassword(this.password);
  }
}
