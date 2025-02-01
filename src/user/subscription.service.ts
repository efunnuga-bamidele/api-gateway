import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SubscriptionService {
  private userServiceUrl: string;
  private userServiceKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.userServiceUrl = this.configService.get<string>('USER_SERVICE_URL');
    this.userServiceKey = this.configService.get<string>('USER_SECURITY_KEY');
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.userServiceKey}`,
    };
  }

  /** Create Subscription Plan */
  async createPlan(planData: any): Promise<any> {
    try {
      const url = `${this.userServiceUrl}/subscriptions/create-plan`;
      const response = await lastValueFrom(
        this.httpService.post(url, planData, { headers: this.getHeaders() }),
      );
      return {
        error: false,
        message: 'Subscription plan created successfully',
        data: response.data,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  /** Get Subscription Plans */
  async getPlans(): Promise<any> {
    try {
      const url = `${this.userServiceUrl}/subscriptions/get-plans`;
      const response = await lastValueFrom(
        this.httpService.get(url, { headers: this.getHeaders() }),
      );
      return {
        error: false,
        message: 'Subscription plans retrieved successfully',
        data: response.data,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  /** Subscribe to a Plan */
  async subscribe(
    brandId: string,
    planId: string,
    monthDuration: number,
  ): Promise<any> {
    try {
      const url = `${this.userServiceUrl}/subscriptions/subscribe`;
      const data = { brandId, planId, monthDuration };
      const response = await lastValueFrom(
        this.httpService.post(url, data, { headers: this.getHeaders() }),
      );
      return {
        error: false,
        message: 'Subscription successful',
        data: response.data,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  /** Centralized Error Handling */
  private handleError(error: any): never {
    console.error(
      'Error in SubscriptionService:',
      error.response?.data || error.message,
    );
    throw new HttpException(
      error.response?.data || 'Service Unavailable',
      error.response?.status || 500,
    );
  }
}
