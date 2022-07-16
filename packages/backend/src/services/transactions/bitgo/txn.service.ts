import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {map} from "rxjs";
import {WalletParams} from "../../../model/WalletParams";
import {TXN} from "../../../model/TXN";
import {BitGo} from 'bitgo'
import axios from 'axios'
import {NewWallet} from "../../../model/NewWallet";
import {BackupKey} from "../../../model/BackupKey";
import {WalletShare} from "../../../model/WalletShare";

function authHeader() {
    const token = process.env.BITGO_ACCESS_TOKEN
    if (token) {
        return {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
    }
    return {
        'Content-Type': 'application/json',
    };
}

function getOptions(req_url : string)  {
    return {
        method: 'GET',
        url: req_url,
        headers: {
            'Authorization': 'Bearer ' + process.env.BITGO_ACCESS_TOKEN,
        }
    }
}

function getConfig()  {
    return {
        headers: {
            'Authorization': 'Bearer ' + process.env.BITGO_ACCESS_TOKEN,
        }
    };
}

@Injectable()
export class BitgoTxnService {

    constructor(private readonly httpService: HttpService) {}

    getTxnHistory(coin: string, wallet: string) {
        const req_url = process.env.BITGO_SERVER_URL + coin + "/wallet/" + wallet + "/transfer"

        return this.httpService.get(req_url, getOptions(req_url)).pipe(
            map(response => response.data)
        );
    }

    async getWalletBalance(coin: string, wallet: string): Promise<string> {

        const bitgo = new BitGo({ env: 'test' });
        const accessToken = process.env.BITGO_ACCESS_TOKEN;
        bitgo.authenticateWithAccessToken({ accessToken });

        const walletInstance = await bitgo.coin(coin).wallets().get({id: wallet});

        return walletInstance.balanceString();
    }

    async getConfirmedBalance(coin: string, wallet: string): Promise<string> {

        const bitgo = new BitGo({ env: 'test' });
        const accessToken = process.env.BITGO_ACCESS_TOKEN;
        bitgo.authenticateWithAccessToken({ accessToken });

        const walletInstance = await bitgo.coin(coin).wallets().get({id: wallet});

        return walletInstance.confirmedBalanceString();
    }

    async getSpendableBalance(coin: string, wallet: string): Promise<string> {

        const bitgo = new BitGo({ env: 'test' });
        const accessToken = process.env.BITGO_ACCESS_TOKEN;
        bitgo.authenticateWithAccessToken({ accessToken });

        const walletInstance = await bitgo.coin(coin).wallets().get({id: wallet});

        return walletInstance.spendableBalanceString();
    }

    unlockAccount() {
        const bitgo = new BitGo({ env: 'test' });
        const accessToken = process.env.BITGO_ACCESS_TOKEN;
        bitgo.authenticateWithAccessToken({ accessToken });

        console.log("unlocking account")
        bitgo.unlock({ otp: '0000000' }).then(function (unlockResponse) {
            return unlockResponse
        });
    }

    async walletTransfers(coin: string, walletId: string) {
        const bitgo = new BitGo({env: 'test'});
        const accessToken = process.env.BITGO_ACCESS_TOKEN;
        bitgo.authenticateWithAccessToken({accessToken});

        const walletInstance = await bitgo.coin(coin).wallets().get({id: walletId});

        return walletInstance.transfers();
    }


    async sendTxn(txn: TXN) {
        this.unlockAccount();

        console.log("sending txn")
        console.log(txn);

        const bitgo = new BitGo({ env: 'test' });
        const accessToken = process.env.BITGO_ACCESS_TOKEN;
        bitgo.authenticateWithAccessToken({ accessToken });

        const walletInstance = await bitgo.coin(txn.coin).wallets().get({id: txn.walletId});

        const txn_data = {
            walletPassphrase: txn.password,
            address: txn.destAddress,
            amount: 0.001 * 1e8
        };

        const amount = Number(txn.amount);

        if(amount > walletInstance.balance()){
            console.log("Amount is greater than balance, balance is " + walletInstance.balance())
        } else if(amount > walletInstance.spendableBalance()){
            console.log("Amount is greater than spendable balance, balance is " + walletInstance.spendableBalance())
        } else if(amount < 2730) {
            console.log("Txn didn't go through because the gas fees will be higher, enter a number greater than 2730")
        } else {
            return walletInstance.send(txn_data)
                .then((response) => {
                    console.log(response);
                    return response;

                })
                .catch((error) => {
                    console.log(error)

                    return error
                })

        }

    }

}
