import { Controller, Get, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { ListResponseDto } from '../../shared/dto/list-response.dto';
import { OrderEntity } from '../database/entities/order.entity';
import { GetOrdersQueryDto } from './dto/get-orders-query.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async getOrders(
    @Query() query: GetOrdersQueryDto,
  ): Promise<ListResponseDto<OrderEntity>> {
    const orders = await this.orderService.getOrders(query);
    return orders;
  }
}
