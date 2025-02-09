import { Module } from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import { UserController } from 'src/user/user.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [HttpModule, JwtModule, ConfigModule],
  controllers: [UserController, SubscriptionController],
  providers: [UsersService, SubscriptionService],
})
export class UsersModule {}
