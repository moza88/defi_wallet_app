import { Controller, Dependencies, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
@Dependencies(AppService)
export class AppController {
  constructor(appService) {
    this.appService = appService;
  }

  @Get('/hello')
  getHello() {
    return this.appService.getHello();
  }

  @Get('/env')
  getEnv() {
    return process.env.BITGO_ACCESS_TOKEN
  }
}
