import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from 'src/user/user.module';
import { ProductModule } from 'src/products/product.module';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, ProductModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
