import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins and methods
  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allow all HTTP methods
    allowedHeaders: '*', // Allow all headers
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false, // Removes extra properties, but does not throw errors
      transform: true,
    }),
  );
  app.setGlobalPrefix('api/v1');

  // Check the environment
  // if (process.env.NODE_ENV === 'development') {
  const config = new DocumentBuilder()
    .setTitle('Zuri Server')
    .setDescription('Zuri Africa API Gateway Server Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);
  // }

  // Expose Swagger JSON at /swagger-json
  // app.getHttpAdapter().get('/swagger-json', (req, res) => {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.send(document);
  // });

  await app.listen(process.env.PORT || 3012);
}
bootstrap();
