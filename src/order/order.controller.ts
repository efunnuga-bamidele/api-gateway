import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderStatus } from './dto/order.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Orders')
@Controller('orders')
@ApiBearerAuth()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create-order')
  @ApiOperation({ summary: 'Create a new order' })
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const { userId, cartId, shippingAddress } = createOrderDto;
    // console.log('createOrderDto:', createOrderDto);
    return await this.orderService.createOrder(userId, cartId, shippingAddress);
  }

  @Get('get-user-order')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all orders of the logged-in user' })
  async getUserOrders(@Request() req: any) {
    return await this.orderService.getUserOrders(req.user.userId);
  }

  /** Get Order by ID */
  @Get('get-order/:orderId')
  @UseGuards(AuthGuard)
  @ApiOperation({ description: 'Get order details by order ID' })
  async getOrderById(@Param('orderId') orderId: string) {
    return await this.orderService.getOrderById(orderId);
  }

  /** Cancel Order */
  @Patch('cancel-order/:orderId')
  @UseGuards(AuthGuard)
  @ApiOperation({ description: 'Cancel an order by order ID' })
  async cancelOrder(@Param('orderId') orderId: string) {
    return await this.orderService.cancelOrder(orderId);
  }

  /** Change Order Status */
  @Patch('change-order-status/:orderId')
  @UseGuards(AuthGuard)
  @ApiOperation({ description: 'Change order status by order ID' })
  async changeOrderStatus(
    @Param('orderId') orderId: string,
    @Body() statusData: { status: OrderStatus },
  ) {
    return await this.orderService.changeOrderStatus(
      orderId,
      statusData.status,
    );
  }
}
