import { FireblocksService } from '../../services/fireblocks/app.service';
import { VaultAccountResponse } from "fireblocks-sdk";
import { VaultAsset } from "../../model/fireblocks/VaultAsset";
import { VaultWalletParams } from "../../model/Fireblocks/VaultWalletParams";
import { NewWallet } from "../../model/Fireblocks/NewWallet";
export declare class FireblocksController {
    private readonly appService;
    constructor(appService: FireblocksService);
    createVaultWallet(vaultWalletParams: VaultWalletParams): Promise<NewWallet>;
    createVault(vaultName: string): Promise<string>;
    createWallet(vaultAsset: VaultAsset): Promise<void>;
    getVaultAccounts(): Promise<VaultAccountResponse[]>;
    getWhiteListedWallets(): Promise<import("fireblocks-sdk").WalletContainerResponse<import("fireblocks-sdk").InternalWalletAsset>[]>;
    getExternalWallets(): Promise<any>;
    getAllAssetsInWhitelistedWallet(walletId: string): Promise<import("fireblocks-sdk").WalletContainerResponse<import("fireblocks-sdk").InternalWalletAsset>>;
    getUsers(): Promise<import("fireblocks-sdk").User[]>;
    getSupportedAssets(): Promise<import("fireblocks-sdk").AssetTypeResponse[]>;
    getTxn(txnId: string): Promise<import("fireblocks-sdk").TransactionResponse>;
    getVaultAccount(accountId: string): Promise<VaultAccountResponse>;
    getBalance(vaultAsset: VaultAsset): Promise<import("fireblocks-sdk").AssetResponse>;
    getTransferTickets(): Promise<import("fireblocks-sdk").TransferTicketResponse[]>;
}
