import { Module } from '@nestjs/common';
import { ProductService } from 'src/products/product.service';
import { ProductController } from 'src/products/product.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from 'src/products/cloudinary.service';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [HttpModule, ConfigModule, JwtModule],
  controllers: [ProductController, CategoryController],
  providers: [ProductService, CloudinaryService, CategoryService],
})
export class ProductModule {}
