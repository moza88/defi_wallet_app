import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { FireblocksService } from '../../services/fireblocks/app.service';
import {ApiTags} from "@nestjs/swagger";
import {VaultAsset} from "../../model/fireblocks/VaultAsset";
import {VaultWalletParams} from "../../model/Fireblocks/VaultWalletParams";
import { setTimeout } from "timers/promises";
import {NewWallet} from "../../model/Fireblocks/NewWallet";
import {Txn} from "../../model/Fireblocks/Txn";
import { VaultAccountFilter} from "../../model/Fireblocks/VaultAccountFilter";
import {Observable} from "rxjs";

@ApiTags('Fireblocks')
@Controller('api/v1/fireblocks')
export class FireblocksController {
  constructor(private readonly appService: FireblocksService) {}


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
   * 3. Transfers an asset from one vault to another vault.
   * @param txn
   */
  @Post('/createTxnVaultToVault')
  async createTxnVaultToVault(
      @Body() txn: Txn
  ) {
    return this.appService.createTxnVaultToVault(txn);
  }

  /**
   * 3. Transfers an asset from one vault to another vault.
   * @param txn
   */
  @Post('/createTxnVaultToAddress')
  async createTxnVaultToAddress(
      @Body() txn: Txn
  ) {
    return this.appService.createTxnVaultToExtWallet(txn);
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

  @Get('/get_transfer_tickets')
  async getTransferTickets() {
    return this.appService.getTransferTickets();
  }



}
