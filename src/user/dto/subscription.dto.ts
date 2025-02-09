import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class SubscribeDto {
  @ApiProperty()
  @IsString()
  planId: string;

  @ApiProperty()
  @IsNumber()
  monthDuration: number;
}

export class PlanDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  price: number;
}
