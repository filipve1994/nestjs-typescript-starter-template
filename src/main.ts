import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // https://docs.nestjs.com/techniques/validation#auto-validation
  // https://docs.nestjs.com/techniques/validation#stripping-properties
  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get('SERVER_PORT') || 3000;
  await app.listen(port);
}
bootstrap();
