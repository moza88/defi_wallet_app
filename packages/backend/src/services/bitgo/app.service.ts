import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {map} from "rxjs";
import {WalletParams} from "../../model/WalletParams";
import {TXN} from "../../model/TXN";
import {Coin, BitGo} from 'bitgo'
import axios from 'axios'
import {doc} from "prettier";
import label = doc.builders.label;
import { AxiosRequestConfig } from 'axios';
import {NewWallet} from "../../model/NewWallet";
import {BackupKey} from "../../model/BackupKey";
import {BigNumber} from "bignumber.js";

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
export class BitgoService {

    constructor(private readonly httpService: HttpService) {}

    login(username: string, password: string) {

        const bitgo = new BitGo({ env: 'test' });
        const accessToken = process.env.BITGO_ACCESS_TOKEN;
        bitgo.authenticateWithAccessToken({ accessToken });

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
                        return ({token, user});
                    })
            });
    }

    logout() {
        const bitgo = new BitGo({ env: 'test' });
        const accessToken = process.env.BITGO_ACCESS_TOKEN;
        bitgo.authenticateWithAccessToken({ accessToken });

        bitgo.logout()
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

    async createWallet(coin: string, wallet_params: WalletParams) : Promise<NewWallet>{

        const bitgo = new BitGo({ env: 'test' });
        const accessToken = process.env.BITGO_ACCESS_TOKEN;
        bitgo.authenticateWithAccessToken({ accessToken });

        const label = wallet_params.label
        const passphrase = wallet_params.passphrase

        const walletOptions = {
            label,
            passphrase,
        };

        console.log(walletOptions);

        const wallet = await bitgo.coin(coin).wallets().generateWallet(walletOptions);

        const walletInstance = wallet.wallet;

/*
        console.log(`Wallet ID: ${walletInstance.id()}`);
        console.log(`Receive address: ${walletInstance.receiveAddress()}`);

        console.log('BACK THIS UP: ');
        console.log(`User keychain encrypted xPrv: ${wallet.userKeychain.encryptedPrv}`);
        console.log(`Backup keychain xPrv: ${wallet.userKeychain.encryptedPrv}`);
*/
        let newWallet = new NewWallet(walletInstance.id(), walletInstance.receiveAddress(), wallet.userKeychain.encryptedPrv, wallet.userKeychain.encryptedPrv, label)

        console.log(newWallet);

        return newWallet;
    }

    createBackupKey(coin){
        const bitgo = new BitGo({ env: 'test' });
        const accessToken = process.env.BITGO_ACCESS_TOKEN;
        bitgo.authenticateWithAccessToken({ accessToken });

        // this function takes one parameter - seed - if you want to create from your own entropy (recommended)
        const backupKey = bitgo.coin(coin).keychains().create();

        console.log('BACK THIS UP: ');
        console.log(`Pub - this is what you add in the browser under the I have a backup key option: ${backupKey.pub}`);

        // extremely sensitive material
        console.log(`Prv - SENSITIVE MATERIAL - this is what you need to save: ${backupKey.prv}`);

        return new BackupKey(backupKey.pub, backupKey.prv);
    }

    async deleteWallet(coin: string, wallet: string) {
        const req_url = process.env.BITGO_SERVER_URL + coin + "/wallet/" + wallet;

        console.log("deleting wallet " + wallet)

        const response = axios.delete(req_url, getConfig())
            .then((resp) => {
                console.log(resp)
            }).catch((error) => {
                console.log(error)
            })

        console.log(response)
        return response;

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

        return await walletInstance.transfers();
    }

    async sendTxn(txn: TXN) {
        this.unlockAccount();

        console.log(txn);

        const bitgo = new BitGo({ env: 'test' });
        const accessToken = process.env.BITGO_ACCESS_TOKEN;
        bitgo.authenticateWithAccessToken({ accessToken });

        const walletInstance = await bitgo.coin(txn.coin).wallets().get({id: txn.walletId});

        const txn_data = {
            walletPassphrase: txn.password,
            address: txn.destAddress,
            amount: txn.amount
        };

        const amount = Number(txn.amount);

        console.log("Amount is " + amount)

        if(amount > walletInstance.balance()){
            console.log("Amount is greater than balance, balance is " + walletInstance.balance())
        } else if(amount > walletInstance.spendableBalance()){
            console.log("Amount is greater than spendable balance, balance is " + walletInstance.spendableBalance())
        } else if(amount < 2730) {
            console.log("Txn didn't go through because the gas fees will be higher, enter a number greater than 2730")
        } else {
            return walletInstance.send(txn_data).catch((error) => {
                console.log(error)

                return error
            })

        }

    }
}
