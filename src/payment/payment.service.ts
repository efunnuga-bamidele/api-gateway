import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { UsersService } from 'src/user/user.service';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class PaymentService {
  private paymentServiceUrl: string;
  private securityKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private userService: UsersService,
    private orderService: OrderService,
  ) {
    this.paymentServiceUrl = this.configService.get<string>(
      'PAYMENT_SERVICE_URL',
    );
    this.securityKey = this.configService.get<string>('PAYMENT_SECURITY_KEY');
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.securityKey}`,
    };
  }

  /** Initiate Payment */
  async initiatePayment(
    userId: string,
    orderId: string,
    paymentMethod: string,
  ): Promise<any> {
    try {
      const url = `${this.paymentServiceUrl}/payments/initiate-payment`;
      const userData = await this.userService.getProfile(userId);
      const orderData = await this.orderService.getOrderById(orderId);
      console.log('order data: ', orderData);
      const email = userData.email;
      const amount = Number(orderData.data.totalAmount);

      const data = { userId, email, orderId, amount, paymentMethod };

      console.log('Data :', data);
      const response = await lastValueFrom(
        this.httpService.post(url, data, { headers: this.getHeaders() }),
      );
      console.log('response :', response);

      if (response.data.error) {
        return response.data;
      }

      return {
        error: false,
        message: 'Payment initiated successfully',
        data: response.data,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  /** Verify Payment */
  async verifyPayment(transactionId: string): Promise<any> {
    try {
      const url = `${this.paymentServiceUrl}/payments/verify-payment`;
      const data = { transactionId };
      const response = await lastValueFrom(
        this.httpService.post(url, data, { headers: this.getHeaders() }),
      );
      return {
        error: false,
        message: 'Payment verified successfully',
        data: response.data,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  /** Centralized Error Handling */
  private handleError(error: any): never {
    console.error(
      'Error in PaymentService:',
      error.response?.data || error.message,
    );
    throw new HttpException(
      error.response?.data || 'Service Unavailable',
      error.response?.status || 500,
    );
  }
}
