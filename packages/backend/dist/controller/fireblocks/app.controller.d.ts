import { FireblocksService } from '../../services/fireblocks/app.service';
import { VaultAccountResponse } from "fireblocks-sdk";
import { VaultAsset } from "../../model/fireblocks/VaultAsset";
export declare class FireblocksController {
    private readonly appService;
    constructor(appService: FireblocksService);
    getWhiteListedWallets(): Promise<import("fireblocks-sdk").WalletContainerResponse<import("fireblocks-sdk").InternalWalletAsset>[]>;
    getExternalWallets(): Promise<any>;
    getAllAssetsInWhitelistedWallet(walletId: string): Promise<import("fireblocks-sdk").WalletContainerResponse<import("fireblocks-sdk").InternalWalletAsset>>;
    getUsers(): Promise<import("fireblocks-sdk").User[]>;
    getSupportedAssets(): Promise<import("fireblocks-sdk").AssetTypeResponse[]>;
    getTxn(txnId: string): Promise<import("fireblocks-sdk").TransactionResponse>;
    createVault(vaultName: string): Promise<VaultAccountResponse>;
    getVaultAccount(accountId: string): Promise<VaultAccountResponse>;
    createVaultAsset(vaultAsset: VaultAsset): Promise<void>;
}
