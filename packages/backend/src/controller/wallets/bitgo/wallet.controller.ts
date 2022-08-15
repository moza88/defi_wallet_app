import {Body, Controller, Delete, Get, Logger, Param, Post} from '@nestjs/common';
import {Observable} from "rxjs";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import { WalletParams} from "../../../model/wallets/bitgo/WalletParams";
import {TXN} from "../../../model/transactions/bitgo/TXN";
import {NewWallet} from "../../../model/wallets/bitgo/NewWallet";
import {WalletShare} from "../../../model/wallets/bitgo/WalletShare";
import {BitgoWalletService} from "../../../services/wallets/bitgo/wallet.service";
import {getError} from "../../error/fireblocks/getError";

@Controller('api/v1/bitgo')
export class BitgoWalletController {
  constructor(private readonly appService: BitgoWalletService) {}

  private readonly logger = new Logger(BitgoWalletController.name);

  @ApiTags('BitGo Wallets - Get Wallets')
  @Get('/wallet_list/coin=:coin')
  getWalletList(
      @Param('coin') coin: string,
  ): Observable<any> {
    return this.appService.getWalletList(coin)
  }

  @ApiTags('BitGo Wallets - Delete Wallet')
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

  @ApiTags('BitGo Wallets - Create Wallet')
  @Post('/create_wallet/coin=:coin')
  async createWallet(
      @Body() walletParams: WalletParams,
      @Param('coin') coin: string,
  ): Promise<NewWallet> {
    return this.appService.createWallet(coin, walletParams);
  }

  @ApiTags('BitGo Wallets - Share Wallet')
  @Post('/share_wallet')
  shareWallet(
      @Body() walletShare : WalletShare
  ) {
    return this.appService.shareWallet(walletShare)
  }

  @ApiTags('BitGo Wallets - Get Address List by Wallet ID')
  @Get('/address_list/coin=:coin/walletId=:walletId')
  getAddressList(
      @Param('coin') coin: string,
      @Param('walletId') walletId: string
  ): Observable<any> {

    return this.appService.getAddressList(coin, walletId);
  }

  @ApiTags('BitGo Wallets - Create Address')
  @Get('/create_address/coin=:coin/walletId=:walletId')
  async createAddress(
      @Param('coin') coin: string,
      @Param('walletId') walletId: string
  ): Promise<any> {
    return this.appService.createAddress(coin, walletId)
        .catch(e => {
            this.logger.log(e);
            return e;
        });
  }

  @ApiTags('BitGo Wallets - Get Address')
  @Get('/get_address/coin=:coin/walletId=:walletId/address=:address')
  async getAddress(
        @Param('coin') coin: string,
        @Param('walletId') walletId: string,
        @Param('address') address: string
    ): Promise<any> {
        return this.appService.getAddress(coin, walletId, address)
            .catch(e => {
                this.logger.log(e);
                return e;
            });
    }

    @ApiTags('BitGo Wallets - Get All Wallets')
    @Get('/get_all_wallets')
    async getAllWallets(): Promise<any> {
        return this.appService.listAllWallets()

    }
}
