import { HttpService } from "@nestjs/axios";
export declare class FireblocksService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getWhitelistedWallets(): Promise<import("fireblocks-sdk").WalletContainerResponse<import("fireblocks-sdk").InternalWalletAsset>[]>;
    getExternalWallets(): Promise<any>;
    getAllAssetsInWhitelistedWallet(walletId: string): Promise<import("fireblocks-sdk").WalletContainerResponse<import("fireblocks-sdk").InternalWalletAsset>>;
    getAllTxns(accountId: string): Promise<import("fireblocks-sdk").VaultAccountResponse>;
    getUsers(): Promise<import("fireblocks-sdk").User[]>;
    getVaultAccounts(): Promise<import("fireblocks-sdk").VaultAccountResponse[]>;
    getSupportedAssets(): Promise<import("fireblocks-sdk").AssetTypeResponse[]>;
    getTxnById(txnId: string): Promise<import("fireblocks-sdk").TransactionResponse>;
    getTransferTickets(): Promise<import("fireblocks-sdk").TransferTicketResponse[]>;
    createVault(vaultName: string): Promise<import("fireblocks-sdk").VaultAccountResponse>;
    getVaultAccountById(id: string): Promise<import("fireblocks-sdk").VaultAccountResponse>;
    createVaultAsset(id: string, asset: string): Promise<import("fireblocks-sdk").VaultAssetResponse>;
}
