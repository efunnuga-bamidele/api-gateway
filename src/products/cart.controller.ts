import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddProductDto, RemoveProductDto } from './dto/cart.dto';

@ApiTags('Cart')
@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('get-user-cart')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get user cart' })
  async getCart(@Request() req: any) {
    const userId = req.user.userId;
    return this.cartService.getCart(userId);
  }

  @Post('add-product')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Add product to cart' })
  async addToCart(@Body() addProductDto: AddProductDto, @Request() req: any) {
    const userId = req.user.userId;
    const { productId, quantity } = addProductDto;
    return this.cartService.addToCart(userId, productId, quantity);
  }

  @Delete('remove-product')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Remove product from cart' })
  async removeFromCart(
    @Body() removeProductDto: Omit<RemoveProductDto, 'userId'>,
    @Request() req: any,
  ) {
    const userId = req.user.userId;
    const { productId } = removeProductDto;
    return this.cartService.removeFromCart(userId, productId);
  }

  @Patch('update-product-quantity')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Update product quantity in cart' })
  async updateCartItem(
    @Body() addProductDto: Omit<AddProductDto, 'userId'>,
    @Request() req: any,
  ) {
    const userId = req.user.userId;
    const { productId, quantity } = addProductDto;
    return this.cartService.updateCartItem(userId, productId, quantity);
  }
}
