import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from './typeorm.config';
import { UserEntity } from './entities/user.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderRepository } from './repositories/order.repository';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeormConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity, OrderEntity]),
  ],
  providers: [OrderRepository, UserRepository],
  exports: [OrderRepository, UserRepository],
})
export class DatabaseModule {}
