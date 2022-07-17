import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {HttpModule} from "@nestjs/axios";

// Imports for Services
import {BitgoAccountService} from "./services/accounts/bitgo/account.service";
import {BitgoTxnService} from "./services/transactions/bitgo/txn.service";
import {BitgoWalletService} from "./services/wallets/bitgo/wallet.service";

//Imports for Controller
import {BitgoTxnController} from "./controller/transactions/bitgo/txn.controller";
import {BitgoAccountController} from "./controller/accounts/bitgo/account.controller";
import {BitgoWalletController} from "./controller/wallets/bitgo/wallet.controller";
import {FireblocksAccountService} from "./services/accounts/fireblocks/account.service";
import {FireblocksWalletService} from "./services/wallets/fireblocks/wallet.service";
import {FireblocksTxnService} from "./services/transactions/fireblocks/txn.service";
import {FireblocksAccountController} from "./controller/accounts/fireblocks/account.controller";
import {FireblocksWalletController} from "./controller/wallets/fireblocks/wallet.controller";
import {FireblocksTxnController} from "./controller/transactions/fireblocks/txn.controller";


@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [

    //Fireblocks
    FireblocksTxnController, FireblocksAccountController, FireblocksWalletController,

    //Bitgo
    BitgoTxnController, BitgoAccountController, BitgoWalletController

  ],
  providers: [
      //Fireblocks
      FireblocksAccountService, FireblocksTxnService, FireblocksWalletService,

      //Bitgo
      BitgoAccountService, BitgoTxnService, BitgoWalletService
  ],
})
export class AppModule {}
