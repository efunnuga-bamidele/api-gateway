import { Module } from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import { UserController } from 'src/user/user.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
    imports: [HttpModule, ConfigModule],
    controllers: [UserController],
    providers: [UsersService],
  })
  export class UsersModule {}