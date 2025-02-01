import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  InitiatePaymentDto,
  CreateSubscriptionPaymentDto,
  VerifyPaymentDto,
} from './dto/payment.dto';

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('initiate-payment')
  @ApiOperation({ description: 'Initiate a new payment' })
  async initiatePayment(
    @Body() initiatePaymentDto: InitiatePaymentDto,
    @Request() req: any,
  ) {
    const userId = req.user.userId;
    const { orderId, paymentMethod } = initiatePaymentDto;
    return await this.paymentService.initiatePayment(
      userId,
      orderId,
      paymentMethod,
    );
  }

  @Post('initiate-subscription-payment')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Initiate a new subscription payment' })
  async initiateSubscriptionPayment(
    @Body() data: CreateSubscriptionPaymentDto,
  ) {
    return this.paymentService.initiateSubscriptionPayment(
      data.userId,
      data.email,
      data.amount,
      data.paymentMethod,
    );
  }

  @Post('verify-payment')
  @ApiOperation({ description: 'Verify a payment transaction' })
  async verifyPayment(@Body() verifyPaymentDto: VerifyPaymentDto) {
    const { transactionId } = verifyPaymentDto;
    return await this.paymentService.verifyPayment(transactionId);
  }
}
