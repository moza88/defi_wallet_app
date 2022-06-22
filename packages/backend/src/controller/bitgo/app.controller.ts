import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { BitgoService } from '../../services/bitgo/app.service';
import {Observable} from "rxjs";
import {ApiOperation} from "@nestjs/swagger";
import { WalletParams} from "../../model/WalletParams";
import {TXN} from "../../model/TXN";
import {NewWallet} from "../../model/NewWallet";
import {WalletShare} from "../../model/WalletShare";

@Controller('api/v1/bitgo')
export class BitgoController {
  constructor(private readonly appService: BitgoService) {}

  @Get('/audit_log')
  getAuditLogs(): Observable<any> {
    return this.appService.getAuditLogs();
  }

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
    this.appService.deleteWallet(coin, walletId);
  }

  @Post('/create_wallet/coin=:coin')
  async createWallet(
      @Body() walletParams: WalletParams,
      @Param('coin') coin: string,
  ): Promise<NewWallet> {
    return this.appService.createWallet(coin, walletParams);
  }

/*
  @Post('/login')
  login(
      @Body() auth : Auth
  ){
    this.appService.login(auth.username, auth.password)
  }
*/

/*  @Post('/logout')
  logout(){
    this.appService.logout()
  }*/

  @Post('/send_txn/')
  sendTxn(
      @Body() txn : TXN
  ) {
    this.appService.sendTxn(txn);
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

  @Get('/txn_history/coin=:coin/walletId=:walletId')
  getTxnHistory(
      @Param('coin') coin: string,
      @Param('walletId') walletId: string
  ): Observable<any> {
    return this.appService.getTxnHistory(coin, walletId);
  }

}
