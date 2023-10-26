import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // https://docs.nestjs.com/techniques/cookies
  app.use(cookieParser());

  // https://docs.nestjs.com/techniques/compression
  app.use(compression());

  // https://docs.nestjs.com/security/helmet
  app.use(helmet());

  // https://docs.nestjs.com/security/cors
  app.enableCors();

  // https://docs.nestjs.com/techniques/validation#auto-validation
  // https://docs.nestjs.com/techniques/validation#stripping-properties
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle(configService.get('SWAGGER_TITLE') || 'Cats example')
    .setDescription(
      configService.get('SWAGGER_DESCRIPION') || 'The cats API description',
    )
    .setVersion(configService.get('SWAGGER_VERSION') || '1.0')
    .addTag(configService.get('SWAGGER_TAGS') || 'cats')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    configService.get('SWAGGER_PATH') || 'api',
    app,
    document,
  );

  const port = configService.get('SERVER_PORT') || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
