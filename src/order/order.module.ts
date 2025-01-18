import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CartService } from 'src/products/cart.service';
import { UsersService } from 'src/user/user.service';
import { OrderController } from './order.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    HttpModule, // To make HTTP requests
    ConfigModule,
    JwtModule, // To access environment variables
  ],
  controllers: [OrderController],
  providers: [OrderService, CartService, UsersService],
  exports: [OrderService], // Export for use in other modules
})
export class OrderModule {}
