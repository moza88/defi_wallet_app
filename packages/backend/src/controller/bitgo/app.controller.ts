import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { BitgoService } from '../../services/bitgo/app.service';
import {Observable} from "rxjs";
import {ApiOperation} from "@nestjs/swagger";
import { WalletParams} from "../../model/WalletParams";
import {TXN} from "../../model/TXN";
import {Auth} from "../../model/Auth";

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

  @Get('/delete_wallet/coin=:coin/walletId=:walletId')
  deleteWallet(
      @Param('coin') coin: string,
      @Param('walletId') walletId: string
  ) {
    this.appService.deleteWallet(coin, walletId);
  }

  @Post('/create_wallet/coin=:coin')
  createWallet(
      @Body() walletParams : WalletParams,
      @Param('coin') coin: string,
  ) {
    this.appService.createWallet(coin, walletParams);
  }

  @Post('/login')
  login(
      @Body() auth : Auth
  ){
    this.appService.login(auth.username, auth.password)
  }

  @Get('/logout')
  logout(){
    this.appService.logout()
  }

  @Post('/send_txn/coin=:coin')
  sendTxn(
      @Body() txn : TXN,
      @Param('coin') coin: string,
  ) {
    this.appService.sendTxn(coin, txn);
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
