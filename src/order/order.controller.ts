import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create-order')
  @ApiOperation({ summary: 'Create a new order' })
  async createOrder(
    @Request() req: any,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const { cartId, shippingAddress } = createOrderDto;
    console.log('createOrderDto:', createOrderDto);
    return await this.orderService.createOrder(
      req.user.userId,
      cartId,
      shippingAddress,
    );
  }

  @Get('get-user-order')
  @ApiOperation({ summary: 'Get all orders of the logged-in user' })
  async getUserOrders(@Request() req: any) {
    return await this.orderService.getUserOrders(req.user.userId);
  }
}
