import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    //https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot(),
    // https://docs.nestjs.com/techniques/http-module
    HttpModule,
    // https://docs.nestjs.com/techniques/database
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
      synchronize: true, // NOT on true in PRODUCTION
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
