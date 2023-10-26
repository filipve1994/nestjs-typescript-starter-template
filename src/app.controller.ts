import { Controller, Get, Logger, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { Role } from '@modules/users/enums/role.enum';
import { Roles } from '@modules/users/decorators/roles.decorator';
import { RolesGuard } from '@modules/users/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/helloroleadmin')
  @Roles(Role.Admin)
  getHelloWithRoles(): string {
    return this.appService.getHelloWithRoles();
  }
}
