import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {map} from "rxjs";
import {TXN} from "../../../model/transactions/bitgo/TXN";
import {bitgo, bitgoCoin, getOptions} from '../../../config/bitgo.config';
import {BitgoAccountService} from "../../accounts/bitgo/account.service";
import {Coin} from "bitgo";

@Injectable()
export class BitgoTxnService {

    constructor(private readonly httpService: HttpService) {}

    private readonly logger = new Logger(BitgoTxnService.name);

    getTxnHistory(coin: string, wallet: string) {
        this.logger.log("Getting txn history for " + wallet + " on " + coin);

        const req_url = process.env.BITGO_SERVER_URL + coin + "/wallet/" + wallet + "/transfer"

        return this.httpService.get(req_url, getOptions(req_url)).pipe(
            map(response => response.data)
        );
    }

    async getWalletBalance(coin: string, wallet: string): Promise<string> {
        this.logger.log("Getting wallet balance for " + wallet + " on " + coin);

        const walletInstance = await bitgoCoin(coin).wallets().get({id: wallet});

        return walletInstance.balanceString();
    }

    async getConfirmedBalance(coin: string, wallet: string): Promise<string> {
        this.logger.log("Getting confirmed balance for " + wallet + " on " + coin);
        const walletInstance = await bitgoCoin(coin).wallets().get({id: wallet});

        return walletInstance.confirmedBalanceString();
    }

    async getSpendableBalance(coin: string, wallet: string): Promise<string> {
        this.logger.log("Getting spendable balance for " + wallet + " on " + coin);

        const walletInstance = await bitgoCoin(coin).wallets().get({id: wallet});

        return walletInstance.spendableBalanceString();
    }


    async walletTransfers(coin: string, walletId: string) {
        this.logger.log("Getting wallet transfers for " + walletId + " on " + coin);

        const walletInstance = await bitgoCoin(coin).wallets().get({id: walletId});

        return walletInstance.transfers();
    }


    async sendTxn(txn: TXN) {

        this.logger.log("Sending txn for " + txn.toString());

        const accountService = new BitgoAccountService(this.httpService);

        accountService.unlockAccount();

        const walletInstance = await bitgoCoin(txn.coin).wallets().get({id: txn.walletId});

        const txn_data = {
            walletPassphrase: txn.password,
            address: txn.destAddress,
            //amount: 0.001 * 1e8
            amount: Number(txn.amount)
        };

        const amount = Number(txn.amount);

        this.logger.log(walletInstance.balance())

        if(amount > walletInstance.balance()){
            this.logger.log("Amount is greater than balance, balance is " + walletInstance.balance())
        } else if(amount > walletInstance.spendableBalance()){
            this.logger.log("Amount is greater than spendable balance, balance is " + walletInstance.spendableBalance())
        /*} else if(amount < 2730) {
            this.logger.log("Txn didn't go through because the gas fees will be higher, enter a number greater than 2730")*/
        } else {
            return walletInstance.send(txn_data)
                .then((response) => {
                    this.logger.log(response.transfer.txid);
                    return response;

                })
                .catch((error) => {
                    this.logger.log(error)

                    return error
                })
        }



    }

    async createTxn(txn: TXN): Promise<any> {

        this.logger.log("Sending txn for " + txn.toString());

        const accountService = new BitgoAccountService(this.httpService);

        accountService.unlockAccount();

        const walletInstance = await bitgoCoin(txn.coin).wallets().get({id: txn.walletId});

        const txn_data = {
            walletPassphrase: txn.password,
            address: txn.destAddress,
            amount: Number(txn.amount)
        };

        const amount = Number(txn.amount);

        this.logger.log("Current Wallet Balance: " + walletInstance.balance())

/*        if(amount > walletInstance.balance()){
            this.logger.log("Amount is greater than balance, balance is " + walletInstance.balance())
        } else if(amount > walletInstance.spendableBalance()){
            this.logger.log("Amount is greater than spendable balance, balance is " + walletInstance.spendableBalance())
            /!*} else if(amount < 2730) {
                this.logger.log("Txn didn't go through because the gas fees will be higher, enter a number greater than 2730")*!/
        } else {*/
        return walletInstance.send(txn_data)
                .then((response) => {
                    this.logger.log(response);
                    this.logger.log(response.transfer);

                    return response;

                })
                .catch((error) => {
                    this.logger.log(error)

                    return error
                })
    }
}
