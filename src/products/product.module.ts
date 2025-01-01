import { Module } from '@nestjs/common';
import { ProductService } from 'src/products/product.service';
import { ProductController } from 'src/products/product.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { CloudinaryService } from 'src/products/cloudinary.service';

@Module({
    imports: [HttpModule, ConfigModule],
    controllers: [ProductController],
    providers: [ProductService, CloudinaryService],
  })
  export class ProductModule {}