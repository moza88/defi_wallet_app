import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {HttpModule} from "@nestjs/axios";

// Imports for Services
import {BitgoAccountService} from "./services/accounts/bitgo/account.service";
import {BitgoTxnService} from "./services/transactions/bitgo/txn.service";
import {BitgoWalletService} from "./services/wallets/bitgo/wallet.service";
import {FireblocksService} from "./services/fireblocks/app.service";

//Imports for Controller
import {BitgoTxnController} from "./controller/transactions/bitgo/transactions.controller";
import {BitgoAccountController} from "./controller/accounts/bitgo/account.controller";
import {BitgoWalletController} from "./controller/wallets/bitgo/wallet.controller";
import {FireblocksController} from "./controller/fireblocks/app.controller";


@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [FireblocksController, BitgoTxnController, BitgoAccountController, BitgoWalletController],
  providers: [FireblocksService, BitgoAccountService, BitgoTxnService, BitgoWalletService],
})
export class AppModule {}
