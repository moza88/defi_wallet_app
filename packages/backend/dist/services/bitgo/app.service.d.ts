import { HttpService } from "@nestjs/axios";
import { WalletParams } from "../../model/WalletParams";
import { TXN } from "../../model/TXN";
import { NewWallet } from "../../model/NewWallet";
import { BackupKey } from "../../model/BackupKey";
export declare class BitgoService {
    private readonly httpService;
    constructor(httpService: HttpService);
    login(username: string, password: string): void;
    logout(): void;
    getAuditLogs(): import("rxjs").Observable<any>;
    getWalletList(coin: string): import("rxjs").Observable<any>;
    createWallet(coin: string, wallet_params: WalletParams): Promise<NewWallet>;
    createBackupKey(coin: any): BackupKey;
    deleteWallet(coin: string, wallet: string): import("rxjs").Observable<any>;
    getAddressList(coin: string, wallet: string): import("rxjs").Observable<any>;
    getTxnHistory(coin: string, wallet: string): import("rxjs").Observable<any>;
    getWalletBalance(coin: string, wallet: string): Promise<string>;
    getConfirmedBalance(coin: string, wallet: string): Promise<string>;
    getSpendableBalance(coin: string, wallet: string): Promise<string>;
    unlockAccount(): void;
    sendTxn(coin: string, txn: TXN): Promise<any>;
}
