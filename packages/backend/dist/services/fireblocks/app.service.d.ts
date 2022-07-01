import { HttpService } from "@nestjs/axios";
import { VaultAccountResponse } from "fireblocks-sdk/dist/types";
import { NewWallet } from "../../model/Fireblocks/NewWallet";
export declare class FireblocksService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getWhitelistedWallets(): Promise<import("fireblocks-sdk").WalletContainerResponse<import("fireblocks-sdk").InternalWalletAsset>[]>;
    getExternalWallets(): Promise<any>;
    getAllAssetsInWhitelistedWallet(walletId: string): Promise<import("fireblocks-sdk").WalletContainerResponse<import("fireblocks-sdk").InternalWalletAsset>>;
    getAllTxns(accountId: string): Promise<VaultAccountResponse>;
    getUsers(): Promise<import("fireblocks-sdk").User[]>;
    getVaultAccounts(): Promise<VaultAccountResponse[]>;
    getSupportedAssets(): Promise<import("fireblocks-sdk").AssetTypeResponse[]>;
    getTxnByExternalId(txnId: string): Promise<import("fireblocks-sdk").TransactionResponse>;
    getTxnById(txnId: string): Promise<import("fireblocks-sdk").TransactionResponse>;
    getTransferTickets(): Promise<import("fireblocks-sdk").TransferTicketResponse[]>;
    createVault(vaultName: string, customerRefId: string): Promise<string>;
    getVaultAccountById(id: string): Promise<VaultAccountResponse>;
    createNewWalletInVault(id: string, asset: string): Promise<NewWallet>;
    getBalance(id: string, asset: string): Promise<import("fireblocks-sdk").AssetResponse>;
    generateAddress(id: string, asset: string): Promise<import("fireblocks-sdk").GenerateAddressResponse>;
    generateDepositAddress(id: string, asset: string, description: string, customerRefId: string): Promise<import("fireblocks-sdk").GenerateAddressResponse>;
    getGasStation(asset: string): Promise<import("fireblocks-sdk").GasStationInfo>;
    createInternalWallet(walletName: string, customerId: string): Promise<import("fireblocks-sdk").WalletContainerResponse<import("fireblocks-sdk").InternalWalletAsset>>;
    createExternalWallet(walletName: string, customerId: string): Promise<import("fireblocks-sdk").WalletContainerResponse<import("fireblocks-sdk").ExternalWalletAsset>>;
}
