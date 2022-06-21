import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {map} from "rxjs";
import {WalletParams} from "../../model/WalletParams";
import {TXN} from "../../model/TXN";
import { BitGo } from 'bitgo';

const bitgo = new BitGo({ env: 'test' });
//const accessToken = process.env.BITGO_ACCESS_TOKEN;

var accessToken = 'v2x3f70d6c84045d8a34ffd50f058d0aed82360bd382b3c6dd06c3aed976aafbf74'
bitgo.authenticateWithAccessToken({ accessToken });

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

function deleteOptions(req_url : string)  {

    return {
        method: 'DELETE',
        url: req_url,
        headers: {
            'Authorization': 'Bearer ' + process.env.BITGO_ACCESS_TOKEN,
        }
    }
}

@Injectable()
export class BitgoService {

    constructor(private readonly httpService: HttpService) {}

    login(username: string, password: string) {

        bitgo.session()
            .then(response => {
                console.log("User is already logged in")
                return ({user: response})
            })
            .catch(error => {

                var otp = "0000000"
                bitgo.authenticate({username, password, otp})
                    .then(response => {
                        var token = response.token;
                        var user = response.user;
                        console.log('Login Success!');
                        console.log(response)
                        return ({token, user});
                    })
            });
    }

    logout() {
        const req_url = process.env.BITGO_SERVER_URL + "/logout";

        this.httpService.get(req_url, getOptions(req_url))
    }

    getAuditLogs() {
      const req_url = process.env.BITGO_SERVER_URL + "/auditlog";

      return this.httpService.get(req_url, getOptions(req_url)).pipe(
        map(response => response.data)
      );
    }

    getWalletList(coin: string) {
        const req_url = process.env.BITGO_SERVER_URL + coin + "/wallet/?limit=50";

        return this.httpService.get(req_url, getOptions(req_url)).pipe(
            map(response => response.data)
        );
    }

    createWallet(coin: string, wallet_params: WalletParams) {
        const req_url = process.env.BITGO_SERVER_URL + coin + "/wallet/generate";

        console.log("creating wallet")

        const requestOptions = { method: 'POST', headers: authHeader(), body: JSON.stringify({ wallet_params }) };
        this.httpService.post(req_url, requestOptions);

    }

    deleteWallet(coin: string, wallet: string) {
        const req_url = process.env.BITGO_SERVER_URL + coin + "/wallet/" + wallet;

        return this.httpService.delete(req_url, deleteOptions(req_url)).pipe(
            map(response => response.data)
        );
    }

    getAddressList(coin: string, wallet: string) {
        const req_url = process.env.BITGO_SERVER_URL + coin + "/wallet/" + wallet + "/addresses";

        return this.httpService.get(req_url, getOptions(req_url)).pipe(
            map(response => response.data)
        );
    }

    getTxnHistory(coin: string, wallet: string) {
        const req_url = process.env.BITGO_SERVER_URL + coin + "/wallet/" + wallet + "/transfer"

        return this.httpService.get(req_url, getOptions(req_url)).pipe(
            map(response => response.data)
        );
    }

    async getWalletBalance(coin: string, wallet: string): Promise<string> {

        const walletInstance = await bitgo.coin(coin).wallets().get({id: wallet});

        return walletInstance.balanceString();
    }

    async getConfirmedBalance(coin: string, wallet: string): Promise<string> {

        const walletInstance = await bitgo.coin(coin).wallets().get({id: wallet});

        return walletInstance.confirmedBalanceString();
    }

    async getSpendableBalance(coin: string, wallet: string): Promise<string> {

        const walletInstance = await bitgo.coin(coin).wallets().get({id: wallet});

        return walletInstance.spendableBalanceString();
    }

    unlockAccount() {
        bitgo.unlock({ otp: '0000000' }).then(function (unlockResponse) {
            console.dir(unlockResponse);
        });
    }

    async sendTxn(coin: string, txn: TXN) {
        this.unlockAccount();

        const walletInstance = await bitgo.coin(coin).wallets().get({id: txn.walletId});

        const txn_data = {
            walletPassphrase: txn.password,
            address: txn.destAddress,
            amount: txn.amount
        };

        walletInstance.send(txn_data)
    }
}
