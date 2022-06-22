import { BitgoService } from '../../services/bitgo/app.service';
import { Observable } from "rxjs";
import { WalletParams } from "../../model/WalletParams";
import { TXN } from "../../model/TXN";
import { NewWallet } from "../../model/NewWallet";
import { WalletShare } from "../../model/WalletShare";
export declare class BitgoController {
    private readonly appService;
    constructor(appService: BitgoService);
    getAuditLogs(): Observable<any>;
    getWalletList(coin: string): Observable<any>;
    deleteWallet(coin: string, walletId: string): void;
    createWallet(walletParams: WalletParams, coin: string): Promise<NewWallet>;
    sendTxn(txn: TXN): void;
    shareWallet(walletShare: WalletShare): Promise<any>;
    getAddressList(coin: string, walletId: string): Observable<any>;
    getTxnHistory(coin: string, walletId: string): Observable<any>;
}
