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
const bitgo = new bitgo_1.BitGo({ env: 'test' });
var accessToken = 'v2x3f70d6c84045d8a34ffd50f058d0aed82360bd382b3c6dd06c3aed976aafbf74';
bitgo.authenticateWithAccessToken({ accessToken });
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
function deleteOptions(req_url) {
    return {
        method: 'DELETE',
        url: req_url,
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
                console.log(response);
                return ({ token, user });
            });
        });
    }
    logout() {
        const req_url = process.env.BITGO_SERVER_URL + "/logout";
        this.httpService.get(req_url, getOptions(req_url));
    }
    getAuditLogs() {
        const req_url = process.env.BITGO_SERVER_URL + "/auditlog";
        return this.httpService.get(req_url, getOptions(req_url)).pipe((0, rxjs_1.map)(response => response.data));
    }
    getWalletList(coin) {
        const req_url = process.env.BITGO_SERVER_URL + coin + "/wallet/?limit=50";
        return this.httpService.get(req_url, getOptions(req_url)).pipe((0, rxjs_1.map)(response => response.data));
    }
    createWallet(coin, wallet_params) {
        const req_url = process.env.BITGO_SERVER_URL + coin + "/wallet/generate";
        console.log("creating wallet");
        const requestOptions = { method: 'POST', headers: authHeader(), body: JSON.stringify({ wallet_params }) };
        this.httpService.post(req_url, requestOptions);
    }
    deleteWallet(coin, wallet) {
        const req_url = process.env.BITGO_SERVER_URL + coin + "/wallet/" + wallet;
        return this.httpService.delete(req_url, deleteOptions(req_url)).pipe((0, rxjs_1.map)(response => response.data));
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
        const walletInstance = await bitgo.coin(coin).wallets().get({ id: wallet });
        return walletInstance.balanceString();
    }
    async getConfirmedBalance(coin, wallet) {
        const walletInstance = await bitgo.coin(coin).wallets().get({ id: wallet });
        return walletInstance.confirmedBalanceString();
    }
    async getSpendableBalance(coin, wallet) {
        const walletInstance = await bitgo.coin(coin).wallets().get({ id: wallet });
        return walletInstance.spendableBalanceString();
    }
    unlockAccount() {
        bitgo.unlock({ otp: '0000000' }).then(function (unlockResponse) {
            console.dir(unlockResponse);
        });
    }
    async sendTxn(coin, txn) {
        this.unlockAccount();
        const walletInstance = await bitgo.coin(coin).wallets().get({ id: txn.walletId });
        const txn_data = {
            walletPassphrase: txn.password,
            address: txn.destAddress,
            amount: txn.amount
        };
        walletInstance.send(txn_data);
    }
};
BitgoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], BitgoService);
exports.BitgoService = BitgoService;
//# sourceMappingURL=app.service.js.map