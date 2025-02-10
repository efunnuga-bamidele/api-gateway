import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CartService {
  private productServiceUrl: string;
  private securityKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.productServiceUrl = this.configService.get<string>(
      'PRODUCT_SERVICE_URL',
    );
    this.securityKey = this.configService.get<string>('PRODUCT_SECURITY_KEY');
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.securityKey}`,
    };
  }

  /** Get User Cart */
  async getCart(
    userId: string,
  ): Promise<{ error: boolean; message: string; data: any }> {
    try {
      const url = `${this.productServiceUrl}/cart/get-user-cart/${userId}`;
      const response = await lastValueFrom(
        this.httpService.get(url, { headers: this.getHeaders() }),
      );
      return {
        error: false,
        message: 'Cart retrieved successfully',
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /** Add Product to Cart */
  async addToCart(
    userId: string,
    products: { productId: string; quantity: number }[],
  ) {
    try {
      const url = `${this.productServiceUrl}/cart/add-product`;
      const data = { userId, products };
      const response = await lastValueFrom(
        this.httpService.post(url, data, { headers: this.getHeaders() }),
      );
      return {
        error: false,
        message: 'Products added to cart successfully',
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /** Remove Product from Cart */
  async removeFromCart(
    userId: string,
    productId: string,
  ): Promise<{ error: boolean; message: string; data: any }> {
    try {
      const url = `${this.productServiceUrl}/cart/remove-product`;
      const data = { userId, productId };
      const response = await lastValueFrom(
        this.httpService.delete(url, { data, headers: this.getHeaders() }),
      );
      return {
        error: false,
        message: 'Product removed from cart successfully',
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /** Update Product Quantity in Cart */
  async updateCartItem(
    userId: string,
    products: { productId: string; quantity: number }[],
  ) {
    try {
      const url = `${this.productServiceUrl}/cart/update-product-quantity`;
      const data = { userId, products };
      const response = await lastValueFrom(
        this.httpService.patch(url, data, { headers: this.getHeaders() }),
      );
      return {
        error: false,
        message: 'Cart items updated successfully',
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /** Checkout Cart */
  async checkout(userId: string, shippingAddress: any) {
    try {
      const url = `${this.productServiceUrl}/cart/checkout`;
      const data = { userId, shippingAddress };
      const response = await lastValueFrom(
        this.httpService.post(url, data, { headers: this.getHeaders() }),
      );

      if (response.data.error) return response.data;

      // Send order data to Order API Gateway
      // const orderUrl = `${this.orderServiceUrl}/orders/create-order`;
      // const orderResponse = await lastValueFrom(this.httpService.post(orderUrl, data, { headers: this.getHeaders() }));

      // if (orderResponse.data.error) return orderResponse.data;

      return {
        error: false,
        message: 'Checkout successful, order created',
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /** Centralized Error Handling */
  private handleError(error: any): {
    error: boolean;
    message: string;
    data: any;
  } {
    console.error(
      'Error in CartService:',
      error.response?.data || error.message,
    );
    return {
      error: true,
      message: error.response?.data?.message || 'Service Unavailable',
      data: null,
    };
  }
}
