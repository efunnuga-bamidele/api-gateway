import { Module } from '@nestjs/common';
import { ProductService } from 'src/products/product.service';
import { ProductController } from 'src/products/product.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from 'src/products/cloudinary.service';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { JwtModule } from '@nestjs/jwt';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports: [HttpModule, ConfigModule, JwtModule],
  controllers: [ProductController, CartController, CategoryController],
  providers: [ProductService, CartService, CloudinaryService, CategoryService],
})
export class ProductModule {}
