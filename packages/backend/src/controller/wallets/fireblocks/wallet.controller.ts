import {Body, Controller, Delete, Get, Logger, Param, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {VaultAsset} from "../../../model/wallets/fireblocks/VaultAsset";
import {VaultWalletParams} from "../../../model/wallets/fireblocks/VaultWalletParams";
import {NewWallet} from "../../../model/wallets/fireblocks/NewWallet";
import {Txn} from "../../../model/transactions/fireblocks/Txn";
import { VaultAccountFilter} from "../../../model/wallets/fireblocks/VaultAccountFilter";
import { VaultDescript} from "../../../model/wallets/fireblocks/VaultDescript";
import {FireblocksWalletService} from "../../../services/wallets/fireblocks/wallet.service";
import {getError} from "../../error/fireblocks/getError";

@Controller('api/v1/fireblocks')
export class FireblocksWalletController {
  constructor(private readonly appService: FireblocksWalletService) {}

  private readonly logger = new Logger(FireblocksWalletController.name);

  @ApiTags('Fireblocks Wallets - Create Vault and Wallet')
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
   * Creates a new vault account for the user. This is the first step to onboard a user.
   * @param vaultName
   */
  @ApiTags('Fireblocks Wallets - Create Vault')
  @Get('/create_vault/:vault_name')
  async createVault(
      @Param('vault_name') vaultName: string,
  ) {
    const customerRefId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return this.appService.createVault(vaultName, customerRefId)
        .catch((e) => {
          this.logger.log(e);
          return getError(e);
        });
  }

  /**
   * Create a asset wallet in the vault created previously. This is the second step to onboard a user.
   * @param vaultAsset
   */
  @ApiTags('Fireblocks Wallets - Create Wallet')
  @Post('/create_wallet/:accountId/:asset')
  async createWallet(
      @Body() vaultAsset: VaultAsset) {
    return this.appService.createNewWalletInVault(vaultAsset.id, vaultAsset.asset)
        .then((data) => {
          console.log(data.address);
        })
        .catch((err) => {
          console.log(err);
        })
        .catch((e) => {
            this.logger.log(e);
            return getError(e);
        });
  }

  /**
   * Get vault account info based on filter
   * @param vaultAccountFilter
   */
  @ApiTags('Fireblocks Wallets - Create Vault Account')
  @Post('/getVaultAccounts')
  getVaultAccounts(
      @Body() vaultAccountFilter: VaultAccountFilter
  ): Promise<any>{
    return this.appService.getVaultAccounts(vaultAccountFilter)
        .catch((e) => {
            this.logger.log(e);
            return getError(e);
        });
  }

  @ApiTags('Fireblocks Wallets - Get All Whitelisted Wallets')
  @Get('/get_whitelisted_wallets')
  getWhiteListedWallets() {
    return this.appService.getWhitelistedWallets()
        .catch((e) => {
            this.logger.log(e);
            return getError(e);
        });
  }

  @ApiTags('Fireblocks Wallets - Get All External Wallets')
  @Get('/get_external_wallets')
  getExternalWallets() {
    return this.appService.getExternalWallets()
        .catch((e) => {
            this.logger.log(e);
            return getError(e);
        });
  }

  @ApiTags('Fireblocks Wallets - Get Whitelisted Wallet by Wallet Id')
  @Get('/get_whitelisted_wallets/:walletId')
  getAllAssetsInWhitelistedWallet(
      @Param('walletId') walletId: string,
  ) {
    return this.appService.getAllAssetsInWhitelistedWallet(walletId)
        .catch((e) => {
            this.logger.log(e);
            return getError(e);
        });
  }

  @ApiTags('Fireblocks Wallets - Get Vault Account by Account Id')
  @Get('/get_vault_account/:accountId')
  async getVaultAccount(
      @Param('accountId') accountId: string
  ) {
        return this.appService.getVaultAccountById(accountId)
            .catch((e) => {
                this.logger.log(e);
                return getError(e);
            });
    }

  @ApiTags('Fireblocks Wallets - Get Balance')
  @Post('/get_balance')
  async getBalance(
      @Body() vaultAsset: VaultAsset
  ) {
    return this.appService.getBalance(vaultAsset.id, vaultAsset.asset)
        .catch((e) => {
            this.logger.log(e);
            return getError(e);
        });
  }

  @ApiTags('Fireblocks Wallets - Get Gas Station Info')
    @Get('/get_gas_station_info/:asset')
    async getGasStationInfo(
        @Param('asset') asset: string
  ) {

        return this.appService.getGasStation(asset)
            .catch((e) => {
                this.logger.log(e);
                return getError(e);
            });
        }

}
