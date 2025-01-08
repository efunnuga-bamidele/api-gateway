import { Controller, Post, Body, Headers } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  SendVerificationEmailDto,
  SendResetPasswordEmailDto,
} from './dto/notification.dto';

@ApiTags('Notifications')
@Controller('email-notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send-verification-email')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Send Verification Email',
    description: 'Sends an email with a verification token to a user',
  })
  async sendVerificationEmail(
    @Body() dto: SendVerificationEmailDto,
    @Headers('authorization') authToken: string,
  ) {
    if (!authToken) {
      return {
        error: true,
        message: 'Authorization token is required',
        data: null,
      };
    }

    const result = await this.notificationService.sendVerificationEmail(
      dto.email,
      dto.token,
      authToken.split(' ')[1],
    );
    return result;
  }

  @Post('send-reset-password-email')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Send Reset Password Email',
    description: 'Sends an email with a reset password token to a user',
  })
  async sendResetPasswordEmail(
    @Body() dto: SendResetPasswordEmailDto,
    @Headers('authorization') authToken: string,
  ) {
    if (!authToken) {
      return {
        error: true,
        message: 'Authorization token is required',
        data: null,
      };
    }

    const result = await this.notificationService.sendResetPasswordEmail(
      dto.email,
      dto.token,
      authToken.split(' ')[1],
    );
    return result;
  }
}
