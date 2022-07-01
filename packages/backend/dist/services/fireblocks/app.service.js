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
const NewWallet_1 = require("../../model/Fireblocks/NewWallet");
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
    async getTxnByExternalId(txnId) {
        return fireblocks().getTransactionByExternalTxId(txnId);
    }
    async getTxnById(txnId) {
        return fireblocks().getTransactionById(txnId);
    }
    async getTransferTickets() {
        return fireblocks().getTransferTickets();
    }
    async createVault(vaultName, customerRefId) {
        const vault = await fireblocks().createVaultAccount(vaultName, false, customerRefId);
        return vault.id;
    }
    async getVaultAccountById(id) {
        return fireblocks().getVaultAccountById(id);
    }
    async createNewWalletInVault(id, asset) {
        const walletInstance = await fireblocks().createVaultAsset(id, asset);
        console.log(walletInstance.address);
        return new NewWallet_1.NewWallet(walletInstance.id, walletInstance.address, '', '');
    }
    async getBalance(id, asset) {
        return fireblocks().getVaultAccountAsset(id, asset);
    }
    async generateAddress(id, asset) {
        return fireblocks().generateNewAddress(id, asset);
    }
    async generateDepositAddress(id, asset, description, customerRefId) {
        return fireblocks().generateNewAddress(id, asset, description, customerRefId);
    }
    async getGasStation(asset) {
        return fireblocks().getGasStationInfo(asset);
    }
    async createInternalWallet(walletName, customerId) {
        return fireblocks().createInternalWallet(walletName, customerId);
    }
    async createExternalWallet(walletName, customerId) {
        return fireblocks().createExternalWallet(walletName, customerId);
    }
};
FireblocksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], FireblocksService);
exports.FireblocksService = FireblocksService;
//# sourceMappingURL=app.service.js.map