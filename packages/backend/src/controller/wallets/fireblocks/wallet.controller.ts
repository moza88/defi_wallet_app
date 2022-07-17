import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {VaultAsset} from "../../../model/fireblocks/VaultAsset";
import {VaultWalletParams} from "../../../model/fireblocks/VaultWalletParams";
import {NewWallet} from "../../../model/fireblocks/NewWallet";
import {Txn} from "../../../model/fireblocks/Txn";
import { VaultAccountFilter} from "../../../model/fireblocks/VaultAccountFilter";
import { VaultDescript} from "../../../model/fireblocks/VaultDescript";
import {FireblocksWalletService} from "../../../services/wallets/fireblocks/wallet.service";

@ApiTags('Fireblocks')
@Controller('api/v1/fireblocks')
export class FireblocksWalletController {
  constructor(private readonly appService: FireblocksWalletService) {}


  @Post('/create_vault_wallet/')
  async createVaultWallet(
        @Body() vaultWalletParams: VaultWalletParams
    ): Promise<NewWallet>{

    const customerRefId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const id = this.appService.createVault(vaultWalletParams.vaultName, customerRefId);

    const newWallet = await this.appService.createNewWalletInVault(await id, vaultWalletParams.asset)

    console.log('results', newWallet);

    return newWallet;
  }

  /**
   * 1. Creates a new vault account for the user. This is the first step to onboard a user.
   * @param vaultName
   */
  @Get('/create_vault/:vault_name')
  async createVault(
      @Param('vault_name') vaultName: string,
  ) {
    const customerRefId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return this.appService.createVault(vaultName, customerRefId);
  }

  /**
   * 2. Create a asset wallet in the vault created previously. This is the second step to onboard a user.
   * @param vaultAsset
   */
  @Post('/create_wallet/:accountId/:asset')
  async createWallet(
      @Body() vaultAsset: VaultAsset) {
    return this.appService.createNewWalletInVault(vaultAsset.id, vaultAsset.asset)
        .then((data) => {
          console.log(data.address);
        })
        .catch((err) => {
          console.log(err);
        });
  }

  /**
   * Get vault account info based on filter
   * @param vaultAccountFilter
   */
  @Post('/getVaultAccounts')
  getVaultAccounts(
      @Body() vaultAccountFilter: VaultAccountFilter
  ): Promise<any>{
    return this.appService.getVaultAccounts(vaultAccountFilter);
  }

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

    @Get('/get_vault_account/:accountId')
    async getVaultAccount(
        @Param('accountId') accountId: string
    ) {
        return this.appService.getVaultAccountById(accountId);
    }

    @Post('/get_balance')
    async getBalance(
        @Body() vaultAsset: VaultAsset
    ) {
        return this.appService.getBalance(vaultAsset.id, vaultAsset.asset);
    }

}
