import {
  Controller,
  Get,
  UseGuards,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Request,
} from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import {
  CreateUserDto,
  AccessTokenDto,
  UpdateUserDto,
  tokenDto,
  LoginDto,
  ResetPasswordDto,
  ForgotPassDto,
  CreateBrandDto,
  RefreshTokenDto,
} from 'src/user/dto/user.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userProxyService: UsersService) {}

  @Post('/user-sign-up')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Sign up for new user',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userProxyService.signUpUser(createUserDto);
  }

  @Post('/brand-sign-up')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Sign up for new brand',
  })
  async createBrand(@Body() createBrandDto: CreateBrandDto) {
    return await this.userProxyService.signUpBrand(createBrandDto);
  }

  @Post('/verify-email')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Verify user email',
  })
  async verifyUserEmail(@Body() tokenData: tokenDto) {
    return await this.userProxyService.verifyUserEmail(tokenData);
  }

  @Patch('/resend-token')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Resend email verification token',
  })
  async resendToken(@Body() resendToken: ForgotPassDto) {
    return await this.userProxyService.resendToken(resendToken.email);
  }

  @Post('/login')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'User login',
  })
  async login(@Body() loginDto: LoginDto) {
    return await this.userProxyService.loginUser(loginDto);
  }

  @Post('/google-signin')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Sign in and up with google',
  })
  async googleSignIn(@Body() firebaseToken: AccessTokenDto) {
    return await this.userProxyService.googleSignIn(firebaseToken.accessToken);
  }

  @Post('/facebook-signin')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Sign in and up with facebook',
  })
  async facebookSignIn(@Body() firebaseToken: AccessTokenDto) {
    return await this.userProxyService.facebookSignIn(
      firebaseToken.accessToken,
    );
  }

  @Get('/get-profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Get user profile by userId',
  })
  async getProfile(@Request() req: any) {
    return await this.userProxyService.getProfile(req.user.userId);
  }

  @Get('/get-brand-profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Get brand profile by brandId',
  })
  async getBrandProfile(@Request() req: any) {
    return await this.userProxyService.getBrandProfile(req.user.userId);
  }

  @Post('/forgot-password')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'User forgot password, send reset otp to email',
  })
  async forgotPassword(@Body() emailPass: ForgotPassDto) {
    return await this.userProxyService.forgotPassword(emailPass.email);
  }

  @Put('/reset-password')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Update User Password',
  })
  async resetPassword(@Body() resetPassDto: ResetPasswordDto) {
    return await this.userProxyService.resetPassword(resetPassDto);
  }

  @Patch('/update-profile')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Update user profile by userId',
  })
  async updateProfile(@Body() updateData: UpdateUserDto, @Request() req: any) {
    return await this.userProxyService.updateProfile(
      updateData,
      req.user.userId,
    );
  }

  @Delete('/delete-profile')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Delete user profile by userId',
  })
  async deleteProfile(@Request() req: any) {
    return await this.userProxyService.deleteProfile(req.user.userId);
  }

  @Get('/get-all-brands')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get all available brands',
  })
  async getBrand() {
    return await this.userProxyService.getBrand();
  }

  // refresh-token

  @Post('/refresh-token')
  @ApiOperation({
    description: 'Refresh user access token',
  })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.userProxyService.refreshToken(
      refreshTokenDto.refreshToken,
    );
  }
}
