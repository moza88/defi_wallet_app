import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VaultService } from '../../services/fireblocks/vault.service';
import {
  PagedVaultAccountsRequestFilters,
  PublicKeyInfoArgs,
  PublicKeyInfoForVaultAccountArgs,
} from 'fireblocks-sdk';

@ApiTags('Fireblocks')
@Controller('api/v1/fireblocks/vault')
export class FireblocksVaultController {
  constructor(private readonly appService: VaultService) {}

  getError(e: any) {
    return {
      status: e.response.status,
      statusText: e.response.statusText,
      message: e.response.data.message,
      code: e.response.data.code,
    };
  }

  /**
   * Retrieves all vault accounts in your workspace. This endpoint returns a limited amount of results and quick response time.
   *
   * @param after
   * @param assetId
   * @param before
   * @param limit
   * @param minAmountThreshold
   * @param namePrefix
   * @param nameSufix
   * @param orderBy
   * @returns
   */
  @Get('/list_vault_accounts_pages/')
  async getVaultAccountsPages(
    @Query('after') after?: string,
    @Query('assetId') assetId?: string,
    @Query('before') before?: string,
    @Query('limit') limit?: number,
    @Query('minAmountThreshold') minAmountThreshold?: number,
    @Query('namePrefix') namePrefix?: string,
    @Query('nameSufix') nameSufix?: string,
    @Query('orderBy') orderBy?: any,
  ) {
    const filter: PagedVaultAccountsRequestFilters = {
      after: after,
      assetId: assetId,
      before: before,
      limit: limit ?? 300, // default
      minAmountThreshold: minAmountThreshold,
      namePrefix: namePrefix,
      nameSuffix: nameSufix,
      orderBy: orderBy ?? 'ASC', // default
    };

    return this.appService
      .getVaultAccountsWithPageInfo(filter)
      .then((r) => {
        return r;
      })
      .catch((e) => {
        console.error(e);
        return this.getError(e);
      });
  }

  /**
   * Retrieves all addresses of a specific asset inside a Fireblocks Vault Account.
   *
   * @param vaultAccountId
   * @param assetId
   * @returns
   */
  @Get('/accounts/:vaultAccountId/:assetId?')
  async getVaultAccountAsset(
    @Param('vaultAccountId') vaultAccountId?: string,
    @Param('assetId') assetId?: string,
  ) {
    return this.appService
      .getVaultAccountAsset(vaultAccountId, assetId)
      .then((r) => {
        return r;
      })
      .catch((e) => {
        console.error(e);
        return this.getError(e);
      });
  }

  // Updates the balance of a specific asset in a Vault Account.
  @Get('/accounts/:vaultAccountId/:assetId?/balance')
  async refreshVaultAssetBalance(
    @Param('vaultAccountId') vaultAccountId?: string,
    @Param('assetId') assetId?: string,
  ) {
    return this.appService
      .refreshVaultAssetBalance(vaultAccountId, assetId)
      .then((r) => {
        return r;
      })
      .catch((e) => {
        console.error(e);
        return this.getError(e);
      });
  }

  // Retrieves all addresses of a specific asset inside a Fireblocks Vault Account.
  @Get('/accounts/:vaultAccountId/:assetId?/addresses')
  async getDepositAddresses(
    @Param('vaultAccountId') vaultAccountId?: string,
    @Param('assetId') assetId?: string,
  ) {
    return this.appService
      .getDepositAddresses(vaultAccountId, assetId)
      .then((r) => {
        return r;
      })
      .catch((e) => {
        console.error(e);
        return this.getError(e);
      });
  }

  @Get('/accounts/:vaultAccountId/:assetId?/max_spendable_amount')
  async getMaxSpendableAmount(
    @Param('vaultAccountId') vaultAccountId?: string,
    @Param('assetId') assetId?: string,
  ) {
    return this.appService
      .getMaxSpendableAmount(vaultAccountId, assetId)
      .then((r) => {
        return r;
      })
      .catch((e) => {
        console.error(e);
        return this.getError(e);
      });
  }

  @Get('/accounts/:vaultAccountId/:assetId?/unspent_inputs')
  async getUnspentInputs(
    @Param('vaultAccountId') vaultAccountId?: string,
    @Param('assetId') assetId?: string,
  ) {
    return this.appService
      .getUnspentInputs(vaultAccountId, assetId)
      .then((r) => {
        return r;
      })
      .catch((e) => {
        console.error(e);
        return this.getError(e);
      });
  }

  /**
   * Returns the requested Vault Account.
   * @param vaultAccountId
   * @returns
   */
  @Get('/account/:vaultAccountId')
  async getVaultAccountById(@Param('vaultAccountId') vaultAccountId?: string) {
    return this.appService
      .getVaultAccountById(vaultAccountId)
      .then((r) => {
        return r;
      })
      .catch((e) => {
        console.error(e);
        return this.getError(e);
      });
  }

  /**
   * Returns the balance of the requested asset
   * @param assetId
   * @returns
   */
  @Get('/assets/:assetId')
  async getVaultBalanceByAsset(@Param('assetId') assetId?: string) {
    return this.appService
      .getVaultBalanceByAsset(assetId)
      .then((r) => {
        return r;
      })
      .catch((e) => {
        console.error(e);
        return this.getError(e);
      });
  }

  @Get('/public_key_info')
  async getVaultpublic_key_info(
    @Query('algorithm') algorithm?: string,
    @Query('compressed') compressed?: boolean,
    @Query('derivationPath') derivationPath?: string,
  ) {
    const filter: PublicKeyInfoArgs = {
      algorithm: algorithm,
      compressed: compressed,
      derivationPath: derivationPath,
    };
    return this.appService
      .getPublicKeyInfo(filter)
      .then((r) => {
        return r;
      })
      .catch((e) => {
        console.error(e);
        return this.getError(e);
      });
  }

  @Get('/getPublicKeyInfoForVaultAccount')
  async getPublicKeyInfoForVaultAccount(
    @Query('vaultAccountId') vaultAccountId?: number,
    @Query('assetId') assetId?: string,
    @Query('addressIndex') addressIndex?: number,
    @Query('change') change?: number,
    @Query('compressed') compressed?: boolean,
  ) {
    const filter: PublicKeyInfoForVaultAccountArgs = {
      addressIndex: addressIndex,
      assetId: assetId,
      change: change,
      vaultAccountId: vaultAccountId,
      compressed: compressed,
    };
    return this.appService
      .getPublicKeyInfoForVaultAccount(filter)
      .then((r) => {
        return r;
      })
      .catch((e) => {
        console.error(e);
        return this.getError(e);
      });
  }
}
