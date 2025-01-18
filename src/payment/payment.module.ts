import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { PaymentController } from './payment.controller';
import { OrderService } from 'src/order/order.service';
import { PaymentService } from './payment.service';
import { CartService } from 'src/products/cart.service';

@Module({
  imports: [
    HttpModule, // To make HTTP requests
    ConfigModule,
    JwtModule, // To access environment variables
  ],
  controllers: [PaymentController],
  providers: [OrderService, PaymentService, CartService, UsersService],
  exports: [PaymentService], // Export for use in other modules
})
export class PaymentModule {}
