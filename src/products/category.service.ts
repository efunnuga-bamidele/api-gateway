import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CategoryService {
  private productServiceUrl = process.env.PRODUCT_SERVICE_URL;
  private productServiceKey = process.env.PRODUCT_SECURITY_KEY; // Security key

  constructor(private readonly httpService: HttpService) {}

  async createCategory(name: string, userId: string): Promise<any> {
    const url = `${this.productServiceUrl}/categories/create-category`;
    const data = { name, userId };
    return this.proxyPostRequest(url, data);
  }

  async getAllCategories(): Promise<any> {
    const url = `${this.productServiceUrl}/categories/get-all-category`;
    return this.proxyGetRequest(url);
  }

  async updateCategory(id: string, name: string): Promise<any> {
    const url = `${this.productServiceUrl}/categories/update-category/${id}`;
    const data = { name };
    return this.proxyPatchRequest(url, data);
  }

  async deleteCategory(id: string): Promise<any> {
    const url = `${this.productServiceUrl}/categories/delete-category/${id}`;
    return this.proxyDeleteRequest(url);
  }

  private getHeaders(): any {
    return {
      Authorization: `Bearer ${this.productServiceKey}`,
    };
  }

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

  private handleError(error: any) {
    console.error(
      'Error in CategoryService:',
      error.response?.data || error.message,
    );
    throw new HttpException(
      error.response?.data || 'Service Unavailable',
      error.response?.status || 500,
    );
  }
}
