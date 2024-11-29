import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { UserEntity } from '../entities/user.entity';
import { ListOrdersQueryDto } from '../../orders/dto/list-orders-query.dto';
import { getSkipPaginationValue } from '../../../shared/utils';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async create(
    orderData: Partial<OrderEntity> | Partial<OrderEntity[]>,
  ): Promise<OrderEntity | OrderEntity[]> {
    if (Array.isArray(orderData)) {
      const orders = this.orderRepository.create(orderData);
      return this.orderRepository.save(orders);
    }

    const order = this.orderRepository.create(orderData);
    return this.orderRepository.save(order);
  }

  async findById(id: number): Promise<OrderEntity | null> {
    return this.orderRepository.findOne({
      where: { id },
    });
  }

  async findOne(query: Partial<OrderEntity>): Promise<OrderEntity | null> {
    return this.orderRepository.findOne({
      where: query,
    });
  }

  async list(
    { page = 1, limit = 20, ...query }: ListOrdersQueryDto,
    user: UserEntity,
  ): Promise<[OrderEntity[], number]> {
    const queryRunner = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .where('order.isDeleted = false')
      .andWhere('user.id = :userId', { userId: user.id });

    // Применяем фильтры
    if (query.tokenB) {
      queryRunner.andWhere('order.tokenB = :tokenB', { tokenB: query.tokenB });
    }

    if (query.user) {
      queryRunner.andWhere('order.user = :user', { user: query.user });
    }

    if (query.active !== undefined) {
      queryRunner.andWhere('order.active = :active', { active: query.active });
    }

    return queryRunner
      .skip(getSkipPaginationValue(page, limit))
      .take(limit)
      .getManyAndCount();
  }

  async updateById(
    id: number,
    updateData: Partial<OrderEntity>,
  ): Promise<void> {
    await this.orderRepository.update({ id }, updateData);
  }

  async softRemove(id: number): Promise<void> {
    await this.orderRepository.update({ id }, { isDeleted: true });
  }
}
