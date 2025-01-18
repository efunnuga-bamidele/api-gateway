import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class AddProductDto {
  @ApiProperty({ description: 'Product ID to be added to the cart' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ description: 'Quantity of the product', example: 1 })
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class RemoveProductDto {
  @ApiProperty({ description: 'Product ID to be removed from the cart' })
  @IsString()
  @IsNotEmpty()
  productId: string;
}
