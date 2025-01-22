import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/roles.enum';
import { CategoryService } from 'src/products/category.service';
import { CreateCategoryDto } from 'src/products/dto/category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create-category')
  @UseGuards(AuthGuard)
  @UseGuards(new RoleGuard([Role.Admin, Role.Vendor]))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new category' })
  async createCategory(
    @Body() createDto: CreateCategoryDto,
    @Request() req: any,
  ) {
    return this.categoryService.createCategory(createDto.name, req.user.userId);
  }

  @Get('get-all-category')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve all categories' })
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Patch('update-category/:id')
  @UseGuards(AuthGuard)
  @UseGuards(new RoleGuard([Role.Admin, Role.Vendor]))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a category by ID' })
  async updateCategory(
    @Param('id') id: string,
    @Body() updateDto: CreateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, updateDto.name);
  }

  @Delete('delete-category/:id')
  @UseGuards(AuthGuard)
  @UseGuards(new RoleGuard([Role.Admin, Role.Vendor]))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a category by ID' })
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
