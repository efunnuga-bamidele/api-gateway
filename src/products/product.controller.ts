import {
    Controller,
    Post,
    Patch,
    Delete,
    Get,
    Body,
    Param,
    Headers,
    UseInterceptors,
    UploadedFiles,
    Request,
  } from '@nestjs/common';
  import { FilesInterceptor } from '@nestjs/platform-express';
  import { CloudinaryService } from 'src/products/cloudinary.service';
  import { ProductService } from 'src/products/product.service';
  import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
  import { CreateProductDto, UpdateProductDto } from 'src/products/dto/product.dto';
 
  
  @ApiTags('Products')
  @Controller('products')
  export class ProductController {
    constructor(
      private readonly productService: ProductService,
      private readonly cloudinaryService: CloudinaryService,
    ) {}
  
    // Create Product
    @Post('create-product')
    @ApiBearerAuth()
    @ApiOperation({ description: 'Create a new product' })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('images'))
    async createProduct(
      @Body() productData: CreateProductDto,
      @UploadedFiles() files: Express.Multer.File[],
      @Headers() headers: any,
    ) {
      const uploadedImageUrls = await Promise.all(
        files.map((file) => this.cloudinaryService.uploadFile(file)),
      );
      productData.images = uploadedImageUrls;
      return this.productService.createProduct(productData, headers);
    }
  
    // Update Product
    @Patch('update-product')
    @ApiBearerAuth()
    @ApiOperation({ description: 'Update a product by productId' })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('images'))
    async updateProduct(
      @Body() updateData: UpdateProductDto,
      @UploadedFiles() files: Express.Multer.File[],
      @Headers() headers: any,
    ) {
      const uploadedImageUrls = await Promise.all(
        files.map((file) => this.cloudinaryService.uploadFile(file)),
      );
      updateData.images = uploadedImageUrls;
      return this.productService.updateProduct(updateData.productId, updateData, headers);
    }
  
    // Delete Product
    @Delete('delete-product/:id')
    @ApiBearerAuth()
    @ApiOperation({ description: 'Delete a product by productId' })
    async deleteProduct(@Param('id') productId: string, @Headers() headers: any) {
      return this.productService.deleteProduct(productId, headers);
    }
  
    // Get Vendor Products by Vendor ID
    @Get('vendor-product')
    @ApiBearerAuth()
    @ApiOperation({ description: 'Get all products created by the authenticated vendor' })
    async getVendorProductByVendor(@Request() req: any, @Headers() headers: any) {
      return this.productService.getVendorProducts(req.user.userId, headers);
    }
  
    // Get Vendor Products by Vendor ID (For Admin or Customers)
    @Get('get-vendor-product/:vendorId')
    @ApiBearerAuth()
    @ApiOperation({ description: 'Get all products by a specific vendor' })
    async getVendorProducts(@Param('vendorId') vendorId: string, @Headers() headers: any) {
      return this.productService.getVendorProducts(vendorId, headers);
    }
  
    // Get All Products
    @Get()
    @ApiBearerAuth()
    @ApiOperation({ description: 'Get all available products' })
    async getAllProducts(@Headers() headers: any) {
      return this.productService.getAllProducts(headers);
    }
  }
  