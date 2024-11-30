import { Controller, Get, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { ListOrdersQueryDto } from './dto/list-orders-query.dto';
import { ListResponseDto } from '../../shared/dto/list-response.dto';
import { OrderEntity } from '../database/entities/order.entity';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async getOrders(
    @Query() query: ListOrdersQueryDto,
  ): Promise<ListResponseDto<OrderEntity>> {
    const orders = await this.orderService.getOrders(query);
    return orders;
  }
}
