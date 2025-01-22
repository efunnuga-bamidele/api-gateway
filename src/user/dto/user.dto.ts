import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  IsNotEmpty,
  ValidateNested,
  IsEnum,
  IsDate,
  Length,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender, Role } from '../types/user.type';

export class AddressDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  number: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  street: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  city: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  state: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  country: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  postalCode: string;
}

export class tokenDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  token: string;
}

export class LoginDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class ForgotPassDto {
  @ApiProperty()
  @IsString()
  email: string;
}

export class UpdateTokenDto {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Matches(/^\+?[0-9]{10,15}$/)
  phoneNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsEnum(Role)
  role: Role;

  // @ApiPropertyOptional()
  // @IsOptional()
  // @ValidateNested()
  // @Type(() => AddressDto)
  // address?: AddressDto;
}

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Matches(/^\+?[0-9]{10,15}$/)
  phoneNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;
}

export class AccessTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  otp: string;

  @ApiProperty()
  @IsString()
  @Length(8)
  newPassword: string;
}
