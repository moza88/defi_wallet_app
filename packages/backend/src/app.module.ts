import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {HttpModule} from "@nestjs/axios";

// Imports for Services
import {BitgoAccountService} from "./services/accounts/bitgo/account.service";
import {BitgoTxnService} from "./services/transactions/bitgo/txn.service";
import {BitgoWalletService} from "./services/wallets/bitgo/wallet-mgmt.service";
import {FireblocksService} from "./services/fireblocks/app.service";

//Imports for Controller
import {BitgoTxnController} from "./controller/transactions/bitgo/transactions.controller";
import {BitgoAccountController} from "./controller/accounts/bitgo/account.controller";
import {BitgoWalletController} from "./controller/wallets/bitgo/wallet.controller";
import {FireblocksController} from "./controller/fireblocks/app.controller";


@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController, FireblocksController, BitgoTxnController, BitgoAccountController, BitgoWalletController],
  providers: [AppService,FireblocksService, BitgoAccountService, BitgoTxnService, BitgoWalletService],
})
export class AppModule {}
