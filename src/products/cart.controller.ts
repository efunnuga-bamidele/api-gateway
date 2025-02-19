import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  AddProductDto,
  CheckoutDto,
  UpdateProductQuantityDto,
  // RemoveProductDto,
} from './dto/cart.dto';

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
  @ApiOperation({ description: 'Add product(s) to cart' })
  async addToCart(@Body() addProductDto: AddProductDto, @Request() req: any) {
    return this.cartService.addToCart(req.user.userId, addProductDto.products);
  }

  @Delete('remove-product/:productId')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Remove product from cart' })
  async removeFromCart(
    @Param('productId') productId: string,
    @Request() req: any,
  ) {
    const userId = req.user.userId;
    return this.cartService.removeFromCart(userId, productId);
  }

  @Patch('update-product-quantity')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Update product quantity in cart' })
  async updateCartItem(
    @Body() updateDto: UpdateProductQuantityDto,
    @Request() req: any,
  ) {
    return this.cartService.updateCartItem(req.user.userId, updateDto.products);
  }

  @Post('checkout')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Checkout cart' })
  async checkout(@Body() checkoutDto: CheckoutDto, @Request() req: any) {
    return this.cartService.checkout(
      req.user.userId,
      checkoutDto.shippingAddress,
    );
  }

  // empty-cart
  @Post('empty-cart')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Empty cart' })
  async emptyCart(@Body() userId: any) {
    return this.cartService.emptyCart(userId);
  }
}
