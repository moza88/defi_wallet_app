import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  FireblocksSDK,
  PagedVaultAccountsResponse,
  PagedVaultAccountsRequestFilters,
  AssetResponse,
  VaultAccountResponse,
  DepositAddressResponse,
  MaxSpendableAmountResponse,
  PublicKeyInfoArgs,
  PublicKeyInfoForVaultAccountArgs,
  RequestOptions,
  VaultBalancesFilter,
} from 'fireblocks-sdk';
import { join } from 'path';
import fs = require('fs');

function fireblocks() {
  const apiSecret = fs
    .readFileSync(join(process.cwd(), process.env.FIREBLOCKS_CERT_PATH))
    .toString();
  return new FireblocksSDK(apiSecret, process.env.FIREBLOCKS_ACCESS_TOKEN);
}

@Injectable()
export class VaultService {
  constructor(private readonly httpService: HttpService) {}

  async getVaultAccountsWithPageInfo(
    pagedAccount: PagedVaultAccountsRequestFilters,
  ): Promise<PagedVaultAccountsResponse> {
    return fireblocks().getVaultAccountsWithPageInfo(pagedAccount);
  }

  async getVaultAccountAsset(
    vaultAccountId: string,
    assetId: string,
  ): Promise<AssetResponse> {
    return fireblocks().getVaultAccountAsset(vaultAccountId, assetId);
  }

  async getVaultAccountById(
    vaultAccountId: string,
  ): Promise<VaultAccountResponse> {
    return fireblocks().getVaultAccountById(vaultAccountId);
  }

  async getVaultBalanceByAsset(assetId: string): Promise<AssetResponse> {
    return fireblocks().getVaultBalanceByAsset(assetId);
  }

  async refreshVaultAssetBalance(
    vaultAccountId: string,
    assetId: string,
    requestOptions?: RequestOptions,
  ): Promise<AssetResponse> {
    return fireblocks().refreshVaultAssetBalance(
      vaultAccountId,
      assetId,
      requestOptions,
    );
  }

  async getDepositAddresses(
    vaultAccountId: string,
    assetId: string,
  ): Promise<DepositAddressResponse[]> {
    return fireblocks().getDepositAddresses(vaultAccountId, assetId);
  }

  async getMaxSpendableAmount(
    vaultAccountId: string,
    assetId: string,
    manualSigning?: boolean,
  ): Promise<MaxSpendableAmountResponse> {
    return fireblocks().getMaxSpendableAmount(
      vaultAccountId,
      assetId,
      manualSigning,
    );
  }

  async getUnspentInputs(
    vaultAccountId: string,
    assetId: string,
  ): Promise<DepositAddressResponse[]> {
    return fireblocks().getUnspentInputs(vaultAccountId, assetId);
  }

  async getPublicKeyInfo(args: PublicKeyInfoArgs): Promise<any> {
    return fireblocks().getPublicKeyInfo(args);
  }

  async getPublicKeyInfoForVaultAccount(
    args: PublicKeyInfoForVaultAccountArgs,
  ): Promise<any> {
    return fireblocks().getPublicKeyInfoForVaultAccount(args);
  }
}
