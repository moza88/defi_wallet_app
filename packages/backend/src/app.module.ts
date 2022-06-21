import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {HttpModule} from "@nestjs/axios";
import {BitgoService} from "./services/bitgo/app.service";
import {BitgoController} from "./controller/bitgo/app.controller";

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController, BitgoController],
  providers: [AppService, BitgoService],
})
export class AppModule {}
