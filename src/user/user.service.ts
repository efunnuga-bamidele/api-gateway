import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  private userServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.userServiceUrl = this.configService.get<string>('USER_SERVICE_URL');
  }

  /** Sign Up User */
  async signUpUser(userData: any): Promise<any> {
    try {
      const url = `${this.userServiceUrl}/users/user-sign-up`;
      const response = await lastValueFrom(this.httpService.post(url, userData));
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /** Verify Email */
  async verifyUserEmail(tokenData: any): Promise<any> {
    try {
      const url = `${this.userServiceUrl}/users/verify-email`;
      const response = await lastValueFrom(this.httpService.post(url, tokenData));
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /** Login User */
  async loginUser(credentials: any): Promise<any> {
    const url = `${this.userServiceUrl}/users/login`;
    console.log('URL:', url);
    console.log('Credentials:', credentials);
  
    try {
      const response = await lastValueFrom(this.httpService.post(url, credentials));
      return response.data;
    } catch (error) {
      // Extract and log relevant details from Axios error
      const errorResponse = {
        message: error.response?.data?.message || error.message,
        statusCode: error.response?.status || 500,
        data: error.response?.data || null,
      };
      console.error('Error Response:', errorResponse);
  
      throw new HttpException(errorResponse, errorResponse.statusCode);
    }
  }

  /** Google Sign-In */
  async googleSignIn(accessToken: string): Promise<any> {
    try {
      const url = `${this.userServiceUrl}/users/google-signin`;
      const response = await lastValueFrom(
        this.httpService.post(url, { accessToken }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /** Facebook Sign-In */
  async facebookSignIn(accessToken: string): Promise<any> {
    try {
      const url = `${this.userServiceUrl}/users/facebook-signin`;
      const response = await lastValueFrom(
        this.httpService.post(url, { accessToken }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /** Get Profile */
  async getProfile( token: string): Promise<any> {
    try {
      const url = `${this.userServiceUrl}/users/get-profile`;
      const response = await lastValueFrom(
        this.httpService.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /** Forgot Password */
  async forgotPassword(email: string): Promise<any> {
    try {
      const url = `${this.userServiceUrl}/users/forgot-password`;
      const response = await lastValueFrom(
        this.httpService.post(url, { email }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /** Reset Password */
  async resetPassword(resetData: any): Promise<any> {
    try {
      const url = `${this.userServiceUrl}/users/reset-password`;
      const response = await lastValueFrom(this.httpService.put(url, resetData));
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /** Update Profile */
  async updateProfile( updateData: any, token: string): Promise<any> {
    try {
      const url = `${this.userServiceUrl}/users/update-profile`;
      const response = await lastValueFrom(
        this.httpService.patch(url, updateData, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /** Delete Profile */
  async deleteProfile( token: string): Promise<any> {
    try {
      const url = `${this.userServiceUrl}/users/delete-profile`;
      const response = await lastValueFrom(
        this.httpService.delete(url, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /** Centralized Error Handler */
  private handleError(error: any): never {
    console.error(`Error in UsersService:`, error.response?.data || error.message);
    throw new HttpException(
      error.response?.data || 'Service unavailable',
      error.response?.status || 500,
    );
  }
}
