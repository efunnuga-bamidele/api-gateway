import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
