import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { FireblocksService } from '../../services/fireblocks/app.service';
import {VaultAccountResponse} from "fireblocks-sdk";
import {ApiTags} from "@nestjs/swagger";
import {VaultAsset} from "../../model/fireblocks/VaultAsset";


@ApiTags('Fireblocks')
@Controller('api/v1/fireblocks')
export class FireblocksController {
  constructor(private readonly appService: FireblocksService) {}

/*  @Get('/get_vault_accounts')
  getVaultAccounts(): Promise<VaultAccountResponse[]> {
    return this.appService.getVaultAccounts();
  }*/

  @Get('/get_whitelisted_wallets')
  getWhiteListedWallets() {
    return this.appService.getWhitelistedWallets();
  }

  @Get('/get_external_wallets')
  getExternalWallets() {
    return this.appService.getExternalWallets();
  }

  @Get('/get_whitelisted_wallets/:walletId')
  getAllAssetsInWhitelistedWallet(
      @Param('walletId') walletId: string,
  ) {
    return this.appService.getAllAssetsInWhitelistedWallet(walletId);
  }

  @Get('/getUsers')
  getUsers() {
    return this.appService.getUsers();
  }

  @Get('/supported_assets')
  getSupportedAssets() {
    return this.appService.getSupportedAssets();
  }

  @Get('/get_txn/:txnId')
  getTxn(
      @Param('txnId') txnId: string,
    ) {
        return this.appService.getTxnById(txnId);
  }

    @Get('/create_vault/:vault_name')
    async createVault(
        @Param('vault_name') vaultName: string,
    ) {
        return this.appService.createVault(vaultName);
    }

    @Get('/get_vault_account/:accountId')
    async getVaultAccount(
        @Param('accountId') accountId: string
    ) {
        return this.appService.getVaultAccountById(accountId);
    }

    @Post('/create_vault_asset/:accountId/:asset')
    async createVaultAsset(
        @Body() vaultAsset: VaultAsset) {
      return this.appService.createVaultAsset(vaultAsset.id, vaultAsset.asset)
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
    }

}
