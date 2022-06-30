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
exports.FireblocksService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const fireblocks_sdk_1 = require("fireblocks-sdk");
const path_1 = require("path");
const fs = require("fs");
function fireblocks() {
    const apiSecret = fs.readFileSync((0, path_1.join)(process.cwd(), './src/services/fireblocks/fireblocks_secret.key')).toString();
    return new fireblocks_sdk_1.FireblocksSDK(apiSecret, process.env.FIREBLOCKS_ACCESS_TOKEN);
}
let FireblocksService = class FireblocksService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getWhitelistedWallets() {
        return fireblocks().getInternalWallets();
    }
    async getExternalWallets() {
        console.log("getting external wallets ");
        return fireblocks().getExternalWallets();
    }
    async getAllAssetsInWhitelistedWallet(walletId) {
        const wallet = await fireblocks().getInternalWallet(walletId);
        console.log(wallet);
        return wallet;
    }
    async getAllTxns(accountId) {
        return fireblocks().getVaultAccountById(accountId);
    }
    async getUsers() {
        return fireblocks().getUsers();
    }
    async getVaultAccounts() {
        return fireblocks().getVaultAccounts();
    }
    async getSupportedAssets() {
        return fireblocks().getSupportedAssets();
    }
    async getTxnById(txnId) {
        return fireblocks().getTransactionByExternalTxId(txnId);
    }
    async getTransferTickets() {
        return fireblocks().getTransferTickets();
    }
    async createVault(vaultName) {
        return fireblocks().createVaultAccount(vaultName);
    }
    async getVaultAccountById(id) {
        return fireblocks().getVaultAccountById(id);
    }
    async createVaultAsset(id, asset) {
        return fireblocks().createVaultAsset(id, asset);
    }
};
FireblocksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], FireblocksService);
exports.FireblocksService = FireblocksService;
//# sourceMappingURL=app.service.js.map