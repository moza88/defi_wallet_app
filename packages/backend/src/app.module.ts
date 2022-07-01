import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {HttpModule} from "@nestjs/axios";
import {BitgoService} from "./services/bitgo/app.service";
import {BitgoController} from "./controller/bitgo/app.controller";
import {FireblocksController} from "./controller/fireblocks/app.controller";
import {FireblocksService} from "./services/fireblocks/app.service";

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController, BitgoController, FireblocksController],
  providers: [AppService, BitgoService, FireblocksService],
})
export class AppModule {}
