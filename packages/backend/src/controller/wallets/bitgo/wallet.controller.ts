import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {Observable} from "rxjs";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import { WalletParams} from "../../../model/WalletParams";
import {TXN} from "../../../model/TXN";
import {NewWallet} from "../../../model/NewWallet";
import {WalletShare} from "../../../model/WalletShare";
import {BitgoWalletService} from "../../../services/wallets/bitgo/wallet.service";

@ApiTags('BitGo')
@Controller('api/v1/bitgo')
export class BitgoWalletController {
  constructor(private readonly appService: BitgoWalletService) {}

  @Get('/wallet_list/coin=:coin')
  getWalletList(
      @Param('coin') coin: string,
  ): Observable<any> {
    return this.appService.getWalletList(coin);
  }

  @Delete('/delete_wallet/coin=:coin/walletId=:walletId')
  deleteWallet(
      @Param('coin') coin: string,
      @Param('walletId') walletId: string
  ) {
    return this.appService.deleteWallet(coin, walletId)
        .then(r => {
            console.log(r);
            return r;
       })
        .catch(e => {
            console.log(e);
            return e;
        });
  }

  @Post('/create_wallet/coin=:coin')
  async createWallet(
      @Body() walletParams: WalletParams,
      @Param('coin') coin: string,
  ): Promise<NewWallet> {
    return this.appService.createWallet(coin, walletParams);
  }

  @Post('/share_wallet')
  shareWallet(
      @Body() walletShare : WalletShare
  ) {
    return this.appService.shareWallet(walletShare)
  }

  @Get('/address_list/coin=:coin/walletId=:walletId')
  getAddressList(
      @Param('coin') coin: string,
      @Param('walletId') walletId: string
  ): Observable<any> {

    return this.appService.getAddressList(coin, walletId);
  }

}
