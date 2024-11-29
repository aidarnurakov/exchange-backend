import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/orders/orders.module';

@Module({
  imports: [OrderModule, DatabaseModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
