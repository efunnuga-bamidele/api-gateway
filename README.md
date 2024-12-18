# ZURI Application

ECommerce Platform

## Development Guidelines

### 1. **Unit Testing**
- Write unit tests for every service, controller, and utility function.
- Use `jest` as the testing framework.
- Maintain at least **80% code coverage** for the application.
- Include test cases for:
  - Happy paths.
  - Edge cases.
  - Error scenarios.
- Mock dependencies using `jest`'s mocking utilities.

#### Example:
```typescript
describe('ProductsService', () => {
  let service: ProductsService;
  let repositoryMock: jest.Mocked<Repository<Product>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: getRepositoryToken(Product), useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repositoryMock = module.get(getRepositoryToken(Product));
  });

  it('should create a product successfully', async () => {
    const productData = { name: 'Craft Item', price: 20 };
    repositoryMock.save.mockResolvedValue(productData);
    const result = await service.create(productData);
    expect(result).toEqual(productData);
  });
});
```

### 2. **Commenting Standards**
- Use multi-line comments for:
  - Method purpose
  - Parameter descriptions with types
  - Expected return values
  - Exceptions or edge cases
- Use single-line comments sparingly for complex logic explanations

#### Example:
```typescript
/**
 * Fetches all products from the database.
 *
 * @returns An array of products.
 * @throws {HttpException} Throws 404 if no products are found.
 */
async getAllProducts(): Promise<Product[]> {
  // Retrieve products from the repository
  return this.productRepository.find();
}
```

### 3. **Naming Conventions**
- Variables: Use camelCase (e.g., `productName`, `orderTotal`)
- Methods: Use camelCase starting with a verb (e.g., `getProduct`, `deleteOrder`)
- Classes: Use PascalCase (e.g., `ProductService`, `OrderController`)
- Files: Use kebab-case (e.g., `products.controller.ts`, `create-product.dto.ts`)
- Constants: Use UPPER_SNAKE_CASE (e.g., `DEFAULT_LIMIT`, `MAX_RETRY_COUNT`)

### 4. **API Throttling**
Implement rate limiting using the `@nestjs/throttler` package:
- Default: 100 requests per minute per user
- Customize limits per endpoint if necessary

#### Example:
```typescript
import { ThrottlerGuard } from '@nestjs/throttler';
import { UseGuards } from '@nestjs/common';

@UseGuards(ThrottlerGuard)
@Controller('products')
export class ProductsController {
  // API endpoints
}
```

### 5. **DRY Principle**
Avoid duplicating code by:
- Extracting reusable logic into helper functions or services
- Using shared modules for common functionality
- Use decorators for repetitive validation logic

#### Example:
```typescript
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;
}
```

### 6. **Clean Code Rules**
- Each function should perform only one task
- Avoid long functions; break them into smaller, modular functions
- Use constants instead of magic numbers
- Write meaningful names for variables, methods, and files

#### Example:
```typescript
// BAD
const x = calculate(5);

// GOOD
const productTotal = calculateProductPrice(quantity);
```

### 7. **Folder Structure**
Group related code by feature or module. Each module should have:
- `controller.ts` for API endpoints
- `service.ts` for business logic
- `dto/` for Data Transfer Objects
- `entities/` for database models

#### Example Structure:
```plaintext
src/
├── products/
│   ├── products.controller.ts
│   ├── products.service.ts
│   ├── products.module.ts
│   ├── dto/
│   │   ├── create-product.dto.ts
│   │   ├── update-product.dto.ts
│   ├── entities/
│   │   ├── product.entity.ts
```

### 8. **Configuration Management**
- Store all sensitive information in an `.env` file
- Use `@nestjs/config` for managing environment variables

#### Example:
```typescript
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getDatabaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }
}
```

### 9-A. **Error Handling**
- Implement a global exception filter for consistent error responses
- Include detailed error messages and appropriate HTTP status codes


#### Example:
```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}
```

### 9-B. **Response Handling**
- Create a standardized response format for all API endpoints
- Include consistent error handling and success responses
- Use reusable response interfaces and classes

#### Response Interface
```typescript
// interfaces/api-response.interface.ts
export interface ApiResponse<T> {
  error: boolean;
  message: string;
  data: T;
}

### 10. **Code Formatting**
- Use Prettier and ESLint for consistent formatting and linting
- Configure a pre-commit hook to enforce formatting rules

### 11. **Commit Messages**
Follow a consistent commit message style (e.g., Conventional Commits):
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation updates
- `style`: Formatting changes
- `refactor`: Code restructuring
- `test`: Adding or updating tests

### 12. **Logging**
Use the Logger service for logging:
- Use different levels (e.g., log, warn, error)
- Avoid logging sensitive data

#### Example:
```typescript
import { Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    this.logger.log('Hello method called');
    return 'Hello World!';
  }
}
```