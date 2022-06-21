import { BitgoService } from '../../services/bitgo/app.service';
import { Observable } from "rxjs";
import { WalletParams } from "../../model/WalletParams";
import { TXN } from "../../model/TXN";
import { Auth } from "../../model/Auth";
export declare class BitgoController {
    private readonly appService;
    constructor(appService: BitgoService);
    getAuditLogs(): Observable<any>;
    getWalletList(coin: string): Observable<any>;
    deleteWallet(coin: string, walletId: string): void;
    createWallet(walletParams: WalletParams, coin: string): void;
    login(auth: Auth): void;
    logout(): void;
    sendTxn(txn: TXN, coin: string): void;
    getAddressList(coin: string, walletId: string): Observable<any>;
    getTxnHistory(coin: string, walletId: string): Observable<any>;
}
