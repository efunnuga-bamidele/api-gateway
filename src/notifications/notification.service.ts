import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  constructor(private readonly httpService: HttpService) {}

  private readonly baseUrl = process.env.NOTIFICATION_SERVICE_URL;

  async sendVerificationEmail(email: string, token: string, authToken: string) {
    try {
      const response = await this.httpService
        .post(
          `${this.baseUrl}/email-notifications/send-verification-email`,
          { email, token },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        )
        .toPromise();

      return {
        error: false,
        message: response.data.message,
        data: response.data.data,
      };
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || 'Error sending email',
        data: null,
      };
    }
  }

  async sendResetPasswordEmail(
    email: string,
    token: string,
    authToken: string,
  ) {
    try {
      const response = await this.httpService
        .post(
          `${this.baseUrl}/email-notifications/send-reset-password-email`,
          { email, token },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        )
        .toPromise();

      return {
        error: false,
        message: response.data.message,
        data: response.data.data,
      };
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || 'Error sending email',
        data: null,
      };
    }
  }
}
