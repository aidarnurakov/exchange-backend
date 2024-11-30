import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/order/orders.module';
import { ConfigModule } from '@nestjs/config';
import { BlockchainModule } from './modules/blockchain/blockchain.module';
import postgresConfig from './configs/postgres.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [postgresConfig],
    }),
    OrderModule,
    DatabaseModule,
    UserModule,
    BlockchainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
