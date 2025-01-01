import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  IsNotEmpty,
  ValidateNested,
  IsEnum,
  IsDate,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender, Role } from 'src/user/types/user.type';

export class AddressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty()
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

  @ApiProperty()
  @IsString()
  @Matches(/^\+?[0-9]{10,15}$/)
  phoneNumber: string;

  @ApiProperty()
  @IsEnum(Gender)
  gender: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsEnum(Role)
  role: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;
}

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\+?[0-9]{10,15}$/)
  phoneNumber: string;

  @ApiProperty()
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

  @ApiProperty()
  @IsString()
  @Length(8)
  confirmPassword: string;
}
