import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';

class AttributesDto {
  @ApiPropertyOptional({
    type: Boolean,
    default: false,
  })
  Blue?: boolean;

  @ApiPropertyOptional({
    type: Boolean,
    default: false,
  })
  Red?: boolean;

  @ApiPropertyOptional({
    type: Boolean,
    default: false,
  })
  Yellow?: boolean;

  @ApiPropertyOptional({
    type: Boolean,
    default: false,
  })
  Green?: boolean;

  @ApiPropertyOptional({
    type: Boolean,
    default: false,
  })
  Black?: boolean;

  @ApiPropertyOptional({
    type: Boolean,
    default: false,
  })
  White?: boolean;

  @ApiPropertyOptional({
    type: [String],
    default: [],
  })
  size?: string[];
}

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  discount?: number;

  @ApiProperty()
  @IsNumber()
  stock: number;

  @IsString()
  @ApiProperty()
  category: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  subCategory?: string;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  images?: string[];

  @ApiPropertyOptional({ type: AttributesDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => AttributesDto)
  attributes?: AttributesDto;
}

export class UpdateProductDto {
  @ApiProperty()
  @IsString()
  productId: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  discount?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  stock?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  subCategory?: string;

  @ApiPropertyOptional({ type: [String], description: 'Image URLs' })
  @IsArray()
  @IsOptional()
  images?: string[];

  @ApiPropertyOptional({ type: AttributesDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => AttributesDto)
  attributes?: AttributesDto;
}
