import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // https://docs.nestjs.com/techniques/validation#auto-validation
  // https://docs.nestjs.com/techniques/validation#stripping-properties
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
