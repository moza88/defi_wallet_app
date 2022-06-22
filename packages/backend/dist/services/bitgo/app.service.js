"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitgoService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const bitgo_1 = require("bitgo");
const axios_2 = require("axios");
const NewWallet_1 = require("../../model/NewWallet");
const BackupKey_1 = require("../../model/BackupKey");
function authHeader() {
    const token = process.env.BITGO_ACCESS_TOKEN;
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
function getOptions(req_url) {
    return {
        method: 'GET',
        url: req_url,
        headers: {
            'Authorization': 'Bearer ' + process.env.BITGO_ACCESS_TOKEN,
        }
    };
}
function getConfig() {
    return {
        headers: {
            'Authorization': 'Bearer ' + process.env.BITGO_ACCESS_TOKEN,
        }
    };
}
let BitgoService = class BitgoService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    login(username, password) {
        const bitgo = new bitgo_1.BitGo({ env: 'test' });
        const accessToken = process.env.BITGO_ACCESS_TOKEN;
        bitgo.authenticateWithAccessToken({ accessToken });
        bitgo.session()
            .then(response => {
            console.log("User is already logged in");
            return ({ user: response });
        })
            .catch(error => {
            var otp = "0000000";
            bitgo.authenticate({ username, password, otp })
                .then(response => {
                var token = response.token;
                var user = response.user;
                console.log('Login Success!');
                return ({ token, user });
            });
        });
    }
    logout() {
        const bitgo = new bitgo_1.BitGo({ env: 'test' });
        const accessToken = process.env.BITGO_ACCESS_TOKEN;
        bitgo.authenticateWithAccessToken({ accessToken });
        bitgo.logout();
    }
    getAuditLogs() {
        const req_url = process.env.BITGO_SERVER_URL + "/auditlog";
        return this.httpService.get(req_url, getOptions(req_url)).pipe((0, rxjs_1.map)(response => response.data));
    }
    getWalletList(coin) {
        const req_url = process.env.BITGO_SERVER_URL + coin + "/wallet/?limit=50";
        return this.httpService.get(req_url, getOptions(req_url)).pipe((0, rxjs_1.map)(response => response.data));
    }
    async createWallet(coin, wallet_params) {
        const bitgo = new bitgo_1.BitGo({ env: 'test' });
        const accessToken = process.env.BITGO_ACCESS_TOKEN;
        bitgo.authenticateWithAccessToken({ accessToken });
        const label = wallet_params.label;
        const passphrase = wallet_params.passphrase;
        const walletOptions = {
            label,
            passphrase,
        };
        console.log(walletOptions);
        const wallet = await bitgo.coin(coin).wallets().generateWallet(walletOptions);
        const walletInstance = wallet.wallet;
        let newWallet = new NewWallet_1.NewWallet(walletInstance.id(), walletInstance.receiveAddress(), wallet.userKeychain.encryptedPrv, wallet.userKeychain.encryptedPrv, label);
        console.log(newWallet);
        return newWallet;
    }
    createBackupKey(coin) {
        const bitgo = new bitgo_1.BitGo({ env: 'test' });
        const accessToken = process.env.BITGO_ACCESS_TOKEN;
        bitgo.authenticateWithAccessToken({ accessToken });
        const backupKey = bitgo.coin(coin).keychains().create();
        console.log('BACK THIS UP: ');
        console.log(`Pub - this is what you add in the browser under the I have a backup key option: ${backupKey.pub}`);
        console.log(`Prv - SENSITIVE MATERIAL - this is what you need to save: ${backupKey.prv}`);
        return new BackupKey_1.BackupKey(backupKey.pub, backupKey.prv);
    }
    async deleteWallet(coin, wallet) {
        const req_url = process.env.BITGO_SERVER_URL + coin + "/wallet/" + wallet;
        console.log("deleting wallet " + wallet);
        const response = axios_2.default.delete(req_url, getConfig())
            .then((resp) => {
            console.log(resp);
        }).catch((error) => {
            console.log(error);
        });
        console.log(response);
        return response;
    }
    getAddressList(coin, wallet) {
        const req_url = process.env.BITGO_SERVER_URL + coin + "/wallet/" + wallet + "/addresses";
        return this.httpService.get(req_url, getOptions(req_url)).pipe((0, rxjs_1.map)(response => response.data));
    }
    getTxnHistory(coin, wallet) {
        const req_url = process.env.BITGO_SERVER_URL + coin + "/wallet/" + wallet + "/transfer";
        return this.httpService.get(req_url, getOptions(req_url)).pipe((0, rxjs_1.map)(response => response.data));
    }
    async getWalletBalance(coin, wallet) {
        const bitgo = new bitgo_1.BitGo({ env: 'test' });
        const accessToken = process.env.BITGO_ACCESS_TOKEN;
        bitgo.authenticateWithAccessToken({ accessToken });
        const walletInstance = await bitgo.coin(coin).wallets().get({ id: wallet });
        return walletInstance.balanceString();
    }
    async getConfirmedBalance(coin, wallet) {
        const bitgo = new bitgo_1.BitGo({ env: 'test' });
        const accessToken = process.env.BITGO_ACCESS_TOKEN;
        bitgo.authenticateWithAccessToken({ accessToken });
        const walletInstance = await bitgo.coin(coin).wallets().get({ id: wallet });
        return walletInstance.confirmedBalanceString();
    }
    async getSpendableBalance(coin, wallet) {
        const bitgo = new bitgo_1.BitGo({ env: 'test' });
        const accessToken = process.env.BITGO_ACCESS_TOKEN;
        bitgo.authenticateWithAccessToken({ accessToken });
        const walletInstance = await bitgo.coin(coin).wallets().get({ id: wallet });
        return walletInstance.spendableBalanceString();
    }
    unlockAccount() {
        const bitgo = new bitgo_1.BitGo({ env: 'test' });
        const accessToken = process.env.BITGO_ACCESS_TOKEN;
        bitgo.authenticateWithAccessToken({ accessToken });
        console.log("unlocking account");
        bitgo.unlock({ otp: '0000000' }).then(function (unlockResponse) {
            return unlockResponse;
        });
    }
    async walletTransfers(coin, walletId) {
        const bitgo = new bitgo_1.BitGo({ env: 'test' });
        const accessToken = process.env.BITGO_ACCESS_TOKEN;
        bitgo.authenticateWithAccessToken({ accessToken });
        const walletInstance = await bitgo.coin(coin).wallets().get({ id: walletId });
        return await walletInstance.transfers();
    }
    async sendTxn(txn) {
        this.unlockAccount();
        console.log(txn);
        const bitgo = new bitgo_1.BitGo({ env: 'test' });
        const accessToken = process.env.BITGO_ACCESS_TOKEN;
        bitgo.authenticateWithAccessToken({ accessToken });
        const walletInstance = await bitgo.coin(txn.coin).wallets().get({ id: txn.walletId });
        const txn_data = {
            walletPassphrase: txn.password,
            address: txn.destAddress,
            amount: txn.amount
        };
        const amount = Number(txn.amount);
        console.log("Amount is " + amount);
        if (amount > walletInstance.balance()) {
            console.log("Amount is greater than balance, balance is " + walletInstance.balance());
        }
        else if (amount > walletInstance.spendableBalance()) {
            console.log("Amount is greater than spendable balance, balance is " + walletInstance.spendableBalance());
        }
        else if (amount < 2730) {
            console.log("Txn didn't go through because the gas fees will be higher, enter a number greater than 2730");
        }
        else {
            return walletInstance.send(txn_data).catch((error) => {
                console.log(error);
                return error;
            });
        }
    }
};
BitgoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], BitgoService);
exports.BitgoService = BitgoService;
//# sourceMappingURL=app.service.js.map