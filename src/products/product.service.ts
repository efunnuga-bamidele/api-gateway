import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductService {
  private productServiceUrl = process.env.PRODUCT_SERVICE_URL;
  private productServiceKey = process.env.PRODUCT_SECURITY_KEY; // Security key for service

  constructor(private readonly httpService: HttpService) {}

  async createProduct(productData: any, userId: string): Promise<any> {
    const url = `${this.productServiceUrl}/products/create-product`;
    return this.proxyPostRequest(url, { userId, ...productData });
  }

  async updateProduct(productId: string, updateData: any): Promise<any> {
    const url = `${this.productServiceUrl}/products/update-product`;
    return this.proxyPatchRequest(url, { productId, ...updateData });
  }

  async deleteProduct(productId: string): Promise<any> {
    const url = `${this.productServiceUrl}/products/delete-product/${productId}`;
    return this.proxyDeleteRequest(url);
  }

  async getBrandProducts(brandId: string): Promise<any> {
    const url = `${this.productServiceUrl}/products/get-brand-product/${brandId}`;
    return this.proxyGetRequest(url);
  }

  async getAllProducts(): Promise<any> {
    const url = `${this.productServiceUrl}/products/get-all-products`;
    return this.proxyGetRequest(url);
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
      'Error in ProductService:',
      error.response?.data || error.message,
    );
    throw new HttpException(
      error.response?.data || 'Service Unavailable',
      error.response?.status || 500,
    );
  }
}
