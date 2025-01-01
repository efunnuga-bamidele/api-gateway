import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductService {
  private productServiceUrl = process.env.PRODUCT_SERVICE_URL;

  constructor(private readonly httpService: HttpService) {}

  async createProduct(productData: any, headers: any): Promise<any> {
    const url = `${this.productServiceUrl}/products/create-product`;
    return this.proxyPostRequest(url, productData, headers);
  }

  async updateProduct(productId: string, updateData: any, headers: any): Promise<any> {
    const url = `${this.productServiceUrl}/products/update-product`;
    return this.proxyPatchRequest(url, { productId, ...updateData }, headers);
  }

  async deleteProduct(productId: string, headers: any): Promise<any> {
    const url = `${this.productServiceUrl}/products/delete-product/${productId}`;
    return this.proxyDeleteRequest(url, headers);
  }

  async getVendorProducts(vendorId: string, headers: any): Promise<any> {
    const url = `${this.productServiceUrl}/products/get-vendor-product/${vendorId}`;
    return this.proxyGetRequest(url, headers);
  }

  async getAllProducts(headers: any): Promise<any> {
    const url = `${this.productServiceUrl}/products`;
    return this.proxyGetRequest(url, headers);
  }

  private async proxyGetRequest(url: string, headers: any): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(url, { headers }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private async proxyPostRequest(url: string, data: any, headers: any): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.post(url, data, { headers }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private async proxyPatchRequest(url: string, data: any, headers: any): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.patch(url, data, { headers }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private async proxyDeleteRequest(url: string, headers: any): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.delete(url, { headers }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    console.error('Error in ProductService:', error.response?.data || error.message);
    throw new HttpException(error.response?.data || 'Service Unavailable', error.response?.status || 500);
  }
}
