import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false, // Will remove extra properties, but not throw an error
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

  await app.listen(process.env.PORT || 3012);
}
bootstrap();
