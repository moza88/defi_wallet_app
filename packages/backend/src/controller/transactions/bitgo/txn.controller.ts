import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {Observable} from "rxjs";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import { WalletParams} from "../../../model/WalletParams";
import {TXN} from "../../../model/TXN";
import {NewWallet} from "../../../model/NewWallet";
import {WalletShare} from "../../../model/WalletShare";
import {BitgoTxnService} from "../../../services/transactions/bitgo/txn.service";

@ApiTags('BitGo')
@Controller('api/v1/bitgo')
export class BitgoTxnController {
  constructor(private readonly appService: BitgoTxnService) {}

  @Post('/send_txn/')
  sendTxn(
      @Body() txn : TXN
  ) {
    this.appService.sendTxn(txn);
  }

  @Get('/txn_history/coin=:coin/walletId=:walletId')
  getTxnHistory(
      @Param('coin') coin: string,
      @Param('walletId') walletId: string
  ): Observable<any> {
    return this.appService.getTxnHistory(coin, walletId);
  }

  @Get('/spendable_balance/coin=:coin/walletId=:walletId')
  getSpendableBalance(
        @Param('coin') coin: string,
        @Param('walletId') walletId: string
    ): Promise<string> {
        return this.appService.getSpendableBalance(coin, walletId);
    }

}
