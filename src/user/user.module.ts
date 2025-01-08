import { Module } from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import { UserController } from 'src/user/user.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [HttpModule, JwtModule, ConfigModule],
  controllers: [UserController],
  providers: [UsersService],
})
export class UsersModule {}
