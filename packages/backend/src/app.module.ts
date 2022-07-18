import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { BitgoService } from './services/bitgo/app.service';
import { BitgoController } from './controller/bitgo/app.controller';
import { FireblocksController } from './controller/fireblocks/app.controller';
import { FireblocksService } from './services/fireblocks/app.service';
import { VaultService } from './services/fireblocks/vault.service';
import { FireblocksVaultController } from './controller/fireblocks/vault.controller';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [
    AppController,
    BitgoController,
    FireblocksController,
    FireblocksVaultController,
  ],
  providers: [AppService, BitgoService, FireblocksService, VaultService],
})
export class AppModule {}
