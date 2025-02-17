import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { CartService } from 'src/products/cart.service';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class OrderService {
  private readonly orderServiceUrl: string;
  private readonly orderServiceKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly cartService: CartService,
    private userService: UsersService,
  ) {
    this.orderServiceUrl = this.configService.get<string>('ORDER_SERVICE_URL');
    this.orderServiceKey = this.configService.get<string>('ORDER_SECURITY_KEY');
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.orderServiceKey}`,
    };
  }

  /** Create Order */
  async createOrder(
    userId: string,
    cartId: string,
    shippingAddress: any,
  ): Promise<any> {
    try {
      // Step 1: Fetch Cart Details
      const cartResponse = await this.cartService.getCart(userId);

      const cartData = cartResponse.data.data;

      // console.log('cart-data:', cartData);

      const userData = await this.userService.getProfile(userId);

      // console.log('user-data:', userData);

      if (!cartData || !cartData.items || cartData.items.length === 0) {
        throw new HttpException('Cart is empty or invalid', 400);
      }

      // Step 2: Prepare Order Data
      const orderData = {
        userId,
        userEmail: userData.email, // Assuming cart data includes user email
        totalAmount: cartData.totalAmount,
        items: cartData.items.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress,
      };

      // console.log('Order Data:', orderData);

      // Step 3: Send Order to Order Microservice
      const orderUrl = `${this.orderServiceUrl}/orders/create-order`;
      const orderResponse = await lastValueFrom(
        this.httpService.post(orderUrl, orderData, {
          headers: this.getHeaders(),
        }),
      );

      // console.log('Order Response:', orderResponse);
      return {
        error: false,
        message: 'Order created successfully',
        data: orderResponse.data,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  /** Get User Orders */
  async getUserOrders(userId: string): Promise<any> {
    try {
      const url = `${this.orderServiceUrl}/orders/get-user-order/${userId}`;
      const response = await lastValueFrom(
        this.httpService.get(url, { headers: this.getHeaders() }),
      );
      return {
        error: false,
        message: 'Orders retrieved successfully',
        data: response.data.data,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  /** Get Order by ID */
  async getOrderById(orderId: string): Promise<any> {
    try {
      const url = `${this.orderServiceUrl}/orders/get-order/${orderId}`;
      const response = await lastValueFrom(
        this.httpService.get(url, { headers: this.getHeaders() }),
      );
      return {
        error: false,
        message: 'Order retrieved successfully',
        data: response.data.data,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  /** Cancel Order */
  async cancelOrder(orderId: string): Promise<any> {
    try {
      const url = `${this.orderServiceUrl}/orders/cancel-order/${orderId}`;
      const response = await lastValueFrom(
        this.httpService.patch(url, {}, { headers: this.getHeaders() }),
      );
      return {
        error: false,
        message: 'Order canceled successfully',
        data: response.data.data,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  // Change Order Status
  async changeOrderStatus(orderId: string, statusData: any): Promise<any> {
    try {
      const url = `${this.orderServiceUrl}/orders/change-order-status/${orderId}`;
      const response = await lastValueFrom(
        this.httpService.patch(url, statusData, { headers: this.getHeaders() }),
      );
      return {
        error: false,
        message: 'Order status changed successfully',
        data: response.data.data,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  /** Centralized Error Handler */
  private handleError(error: any): never {
    console.error(
      'Error in OrderService:',
      error.response?.data || error.message,
    );
    throw new HttpException(
      error.response?.data || 'Service Unavailable',
      error.response?.status || 500,
    );
  }
}
