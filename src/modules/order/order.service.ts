import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../database/entities/order.entity';
import { GetOrdersQueryDto } from './dto/get-orders-query.dto';
import { ListResponseDto } from '../../shared/dto/list-response.dto';
import { GetMatchingOrdersDto } from './dto/get-matching-orders-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getSkipPaginationValue } from '../../shared/utils';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async getOrders({
    page = 1,
    limit = 20,
    ...query
  }: GetOrdersQueryDto): Promise<ListResponseDto<OrderEntity>> {
    const queryRunner = this.orderRepository
      .createQueryBuilder('order')
      .where('order.isDeleted = false');

    if (query.user) {
      queryRunner
        .leftJoinAndSelect('order.user', 'user')
        .andWhere('order.user = :user', { user: query.user });
    }

    if (query.tokenA) {
      queryRunner.andWhere('order.tokenA = :tokenA', { tokenA: query.tokenA });
    }

    if (query.tokenB) {
      queryRunner.andWhere('order.tokenB = :tokenB', { tokenB: query.tokenB });
    }

    if (query.active !== undefined) {
      queryRunner.andWhere('order.active = :active', { active: query.active });
    }

    const [items, count] = await queryRunner
      .skip(getSkipPaginationValue(page, limit))
      .take(limit)
      .getManyAndCount();

    return {
      totalCount: count,
      items,
    };
  }

  async getMatchingOrders({
    page = 1,
    limit = 20,
    ...query
  }: GetMatchingOrdersDto): Promise<ListResponseDto<OrderEntity>> {
    const queryRunner = this.orderRepository
      .createQueryBuilder('order')
      .where('order.isDeleted = false');

    if (query.tokenA) {
      queryRunner.andWhere('order.tokenA = :tokenA', { tokenA: query.tokenA });
    }

    if (query.tokenB) {
      queryRunner.andWhere('order.tokenB = :tokenB', { tokenB: query.tokenB });
    }

    if (query.amountA) {
      queryRunner.andWhere('order.amountA = :amountA', {
        amountA: query.amountA,
      });
    }

    if (query.amountB) {
      queryRunner.andWhere('order.amountB = :amountB', {
        amountB: query.amountB,
      });
    }

    const [items, count] = await queryRunner
      .skip(getSkipPaginationValue(page, limit))
      .take(limit)
      .getManyAndCount();

    return {
      totalCount: count,
      items,
    };
  }
}
