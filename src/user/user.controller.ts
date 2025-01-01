import { Controller, Get, UseGuards, Post, Put, Patch, Delete, Body, Headers, Query } from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import { CreateUserDto, AccessTokenDto, UpdateUserDto, tokenDto, LoginDto, ResetPasswordDto, ForgotPassDto } from 'src/user/dto/user.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userProxyService: UsersService) {}

  @Post('/user-sign-up')
  @ApiBearerAuth()
  @ApiOperation({
    description: '',
  })
  async create(@Body() createUserDto: CreateUserDto, @Headers() headers: any) {
    return await this.userProxyService.signUpUser(createUserDto);
  }

  @Post('/verify-email')
  @ApiBearerAuth()
  @ApiOperation({
    description: '',
  })
  async verifyUserEmail(@Body() tokenData: tokenDto, @Headers() headers: any) {
    return await this.userProxyService.verifyUserEmail(tokenData);
  }

  @Post('/login')
  @ApiBearerAuth()
  @ApiOperation({
    description: '',
  })
  async login(@Body() loginDto: LoginDto) {
    return await this.userProxyService.loginUser(loginDto);
  }

  @Post('/google-signin')
  @ApiBearerAuth()
  @ApiOperation({
    description: '',
  })
  async googleSignIn(@Body() firebaseToken: AccessTokenDto, @Headers() headers: any) {
    return await this.userProxyService.googleSignIn(firebaseToken.accessToken);
  }

  @Post('/facebook-signin')
  @ApiBearerAuth()
  @ApiOperation({
    description: '',
  })
  async facebookSignIn(@Body() firebaseToken: AccessTokenDto, @Headers() headers: any) {
    return await this.userProxyService.facebookSignIn(firebaseToken.accessToken);
  }

  @Get('/get-profile')
  @ApiBearerAuth()
  @ApiOperation({
    description: '',
  })
  async getProfile(@Headers() headers: any) {
    // console.log(headers);
    const token = headers.authorization.split(' ')[1];
    return await this.userProxyService.getProfile(token);
  }

  @Post('/forgot-password')
  @ApiBearerAuth()
  @ApiOperation({
    description: '',
  })
  async forgotPassword(@Body() emailPass: ForgotPassDto, @Headers() headers: any) {
    return await this.userProxyService.forgotPassword(emailPass.email);
  }

  @Put('/reset-password')
  @ApiBearerAuth()
  @ApiOperation({
    description: '',
  })
  async resetPassword(@Body() resetPassDto: ResetPasswordDto, @Headers() headers: any) {
    return await this.userProxyService.resetPassword(resetPassDto);
  }

  @Patch('/update-profile')
  @ApiBearerAuth()
  @ApiOperation({
    description: '',
  })
  async updateProfile(@Body() updateData: UpdateUserDto, @Headers() headers: any) {
    const token = headers.authorization.split(' ')[1];

    return await this.userProxyService.updateProfile(updateData, token);
  }

  @Delete('/delete-profile')
  @ApiBearerAuth()
  @ApiOperation({
    description: '',
  })
  async deleteProfile( @Headers() headers: any) {
    const token = headers.authorization.split(' ')[1];

    return await this.userProxyService.deleteProfile(token);
  }
}
