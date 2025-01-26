import {
  Controller,
  Post,
  Patch,
  Delete,
  Get,
  Body,
  Param,
  UseInterceptors,
  UploadedFiles,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/products/cloudinary.service';
import { ProductService } from 'src/products/product.service';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dto/product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/roles.enum';

@ApiTags('Products')
@Controller('products')
// @UseGuards(AuthGuard)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('create-product')
  @UseGuards(AuthGuard)
  @UseGuards(new RoleGuard([Role.Admin, Role.Brand]))
  @ApiBearerAuth()
  @ApiOperation({ description: 'Create a new product' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images'))
  async createProduct(
    @Body() productData: CreateProductDto,
    @Request() req: any,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const uploadedImageUrls = await Promise.all(
      files.map((file) => this.cloudinaryService.uploadFile(file)),
    );
    productData.images = uploadedImageUrls;

    return this.productService.createProduct(productData, req.user.userId);
  }

  @Patch('update-product')
  @UseGuards(AuthGuard)
  @UseGuards(new RoleGuard([Role.Admin, Role.Brand]))
  @ApiBearerAuth()
  @ApiOperation({ description: 'Update a product by productId' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images'))
  async updateProduct(
    @Body() updateData: UpdateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (files) {
      const uploadedImageUrls = await Promise.all(
        files.map((file) => this.cloudinaryService.uploadFile(file)),
      );
      updateData.images = uploadedImageUrls;
    }
    return this.productService.updateProduct(updateData.productId, updateData);
  }

  @Delete('delete-product/:id')
  @UseGuards(AuthGuard)
  @UseGuards(new RoleGuard([Role.Admin, Role.Brand]))
  @ApiBearerAuth()
  @ApiOperation({ description: 'Delete a product by productId' })
  async deleteProduct(@Param('id') productId: string) {
    return this.productService.deleteProduct(productId);
  }

  @Get('brand-product')
  @UseGuards(new RoleGuard([Role.Brand]))
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get all products created by brand' })
  async getBrandProductsByBrand(@Request() req: any) {
    return this.productService.getBrandProducts(req.user.userId);
  }

  @Get('get-brand-product/:brandId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get all products by a specific brand' })
  async getBrandProducts(@Param('brandId') brandId: string) {
    return this.productService.getBrandProducts(brandId);
  }

  @Get('get-all-products')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get all available products' })
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('search')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Search products by name' })
  async searchProducts(@Query('name') name: string) {
    return await this.productService.searchProducts(name);
  }
}
