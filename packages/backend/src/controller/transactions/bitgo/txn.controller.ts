import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {Observable} from "rxjs";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import { WalletParams} from "../../../model/wallets/bitgo/WalletParams";
import {TXN} from "../../../model/transactions/bitgo/TXN";
import {NewWallet} from "../../../model/wallets/bitgo/NewWallet";
import {WalletShare} from "../../../model/wallets/bitgo/WalletShare";
import {BitgoTxnService} from "../../../services/transactions/bitgo/txn.service";

@Controller('api/v1/bitgo')
export class BitgoTxnController {
  constructor(private readonly appService: BitgoTxnService) {}

  @ApiTags('BitGo Transactions - Send Transaction')
  @Post('/send_txn/')
  sendTxn(
      @Body() txn : TXN
  ) {
    this.appService.sendTxn(txn);
  }

  @ApiTags('BitGo Transactions - Get Transaction History')
  @Get('/txn_history/coin=:coin/walletId=:walletId')
  getTxnHistory(
      @Param('coin') coin: string,
      @Param('walletId') walletId: string
  ): Observable<any> {
    return this.appService.getTxnHistory(coin, walletId);
  }

  @ApiTags('BitGo Transactions - Get Spendable Balance')
  @Get('/spendable_balance/coin=:coin/walletId=:walletId')
  getSpendableBalance(
        @Param('coin') coin: string,
        @Param('walletId') walletId: string
    ): Promise<string> {
        return this.appService.getSpendableBalance(coin, walletId);
    }

    @ApiTags('BitGo Transactions - Create Transaction')
    @Post('/create_txn/')
    createTxn(
        @Body() txn : TXN
    ) {
        this.appService.createTxn(txn);
    }

}
