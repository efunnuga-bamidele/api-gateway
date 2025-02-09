import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  private userServiceUrl: string;
  private userServiceKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.userServiceUrl = this.configService.get<string>('USER_SERVICE_URL');
    this.userServiceKey = this.configService.get<string>('USER_SECURITY_KEY');
  }

  /** Utility Method: Get Headers */
  private getHeaders() {
    return {
      Authorization: `Bearer ${this.userServiceKey}`,
    };
  }

  /** Sign Up User */
  async signUpUser(userData: any): Promise<any> {
    const url = `${this.userServiceUrl}/users/user-sign-up`;
    return this.proxyPostRequest(url, userData);
  }

  /** Sign Up Brand */
  async signUpBrand(brandData: any): Promise<any> {
    const url = `${this.userServiceUrl}/users/brand-sign-up`;
    return this.proxyPostRequest(url, brandData);
  }

  /** Verify Email */
  async verifyUserEmail(tokenData: any): Promise<any> {
    const url = `${this.userServiceUrl}/users/verify-email`;
    return this.proxyPostRequest(url, tokenData);
  }

  /** Resend Email Verification Token */
  async resendToken(email: string): Promise<any> {
    try {
      const url = `${this.userServiceUrl}/users/resend-token`;
      const response = await lastValueFrom(
        this.httpService.patch(url, { email }, { headers: this.getHeaders() }),
      );
      return {
        error: false,
        message: 'Verification token resent successfully',
        data: response.data,
      };
    } catch (error) {
      console.error('Error resending token:', error.message);
      return {
        error: true,
        message: error.response?.data?.message || 'Error resending token',
        data: null,
      };
    }
  }

  /** Login User */
  async loginUser(credentials: any): Promise<any> {
    const url = `${this.userServiceUrl}/users/login`;
    return this.proxyPostRequest(url, credentials);
  }

  /** Google Sign-In */
  async googleSignIn(accessToken: string): Promise<any> {
    const url = `${this.userServiceUrl}/users/google-signin`;
    return this.proxyPostRequest(url, { accessToken });
  }

  /** Facebook Sign-In */
  async facebookSignIn(accessToken: string): Promise<any> {
    const url = `${this.userServiceUrl}/users/facebook-signin`;
    return this.proxyPostRequest(url, { accessToken });
  }

  /** Get Profile */
  async getProfile(userId: string): Promise<any> {
    const url = `${this.userServiceUrl}/users/get-profile/${userId}`;
    return this.proxyGetRequest(url);
  }

  /** Get Profile */
  async getBrandProfile(brandId: string): Promise<any> {
    const url = `${this.userServiceUrl}/users/get-brand-profile/${brandId}`;
    return this.proxyGetRequest(url);
  }

  /** Get All Brands */
  async getBrand(): Promise<any> {
    const url = `${this.userServiceUrl}/users/get-all-brands`;
    return this.proxyGetRequest(url);
  }

  /** Forgot Password */
  async forgotPassword(email: string): Promise<any> {
    const url = `${this.userServiceUrl}/users/forgot-password`;
    return this.proxyPostRequest(url, { email });
  }

  /** Reset Password */
  async resetPassword(resetData: any): Promise<any> {
    const url = `${this.userServiceUrl}/users/reset-password`;
    return this.proxyPutRequest(url, resetData);
  }

  /** Update Profile */
  async updateProfile(updateData: any, userId: string): Promise<any> {
    const url = `${this.userServiceUrl}/users/update-profile`;
    return this.proxyPatchRequest(url, { ...updateData, userId });
  }

  /** Delete Profile */
  async deleteProfile(userId: string): Promise<any> {
    const url = `${this.userServiceUrl}/users/delete-profile/${userId}`;
    return this.proxyDeleteRequest(url);
  }

  /** Proxy Methods */

  private async proxyGetRequest(url: string): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(url, { headers: this.getHeaders() }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private async proxyPostRequest(url: string, data: any): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.post(url, data, { headers: this.getHeaders() }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private async proxyPutRequest(url: string, data: any): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.put(url, data, { headers: this.getHeaders() }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private async proxyPatchRequest(url: string, data: any): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.patch(url, data, { headers: this.getHeaders() }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private async proxyDeleteRequest(url: string): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.delete(url, { headers: this.getHeaders() }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /** Error Handler */
  private handleError(error: any): never {
    console.error(
      'Error in UsersService:',
      error.response?.data || error.message,
    );
    throw new HttpException(
      error.response?.data || 'Service Unavailable',
      error.response?.status || 500,
    );
  }
}
