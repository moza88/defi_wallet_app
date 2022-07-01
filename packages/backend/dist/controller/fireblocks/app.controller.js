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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireblocksController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("../../services/fireblocks/app.service");
const swagger_1 = require("@nestjs/swagger");
const VaultAsset_1 = require("../../model/fireblocks/VaultAsset");
const VaultWalletParams_1 = require("../../model/Fireblocks/VaultWalletParams");
let FireblocksController = class FireblocksController {
    constructor(appService) {
        this.appService = appService;
    }
    async createVaultWallet(vaultWalletParams) {
        const customerRefId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const id = this.appService.createVault(vaultWalletParams.vaultName, customerRefId);
        const newWallet = await this.appService.createNewWalletInVault(await id, vaultWalletParams.asset);
        console.log('results', newWallet);
        return newWallet;
    }
    async createVault(vaultName) {
        const customerRefId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        return this.appService.createVault(vaultName, customerRefId);
    }
    async createWallet(vaultAsset) {
        return this.appService.createNewWalletInVault(vaultAsset.id, vaultAsset.asset)
            .then((data) => {
            console.log(data.address);
        })
            .catch((err) => {
            console.log(err);
        });
    }
    getVaultAccounts() {
        return this.appService.getVaultAccounts();
    }
    getWhiteListedWallets() {
        return this.appService.getWhitelistedWallets();
    }
    getExternalWallets() {
        return this.appService.getExternalWallets();
    }
    getAllAssetsInWhitelistedWallet(walletId) {
        return this.appService.getAllAssetsInWhitelistedWallet(walletId);
    }
    getUsers() {
        return this.appService.getUsers();
    }
    getSupportedAssets() {
        return this.appService.getSupportedAssets();
    }
    getTxn(txnId) {
        return this.appService.getTxnById(txnId);
    }
    async getVaultAccount(accountId) {
        return this.appService.getVaultAccountById(accountId);
    }
    async getBalance(vaultAsset) {
        return this.appService.getBalance(vaultAsset.id, vaultAsset.asset);
    }
    async getTransferTickets() {
        return this.appService.getTransferTickets();
    }
};
__decorate([
    (0, common_1.Post)('/create_vault_wallet/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VaultWalletParams_1.VaultWalletParams]),
    __metadata("design:returntype", Promise)
], FireblocksController.prototype, "createVaultWallet", null);
__decorate([
    (0, common_1.Get)('/create_vault/:vault_name'),
    __param(0, (0, common_1.Param)('vault_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FireblocksController.prototype, "createVault", null);
__decorate([
    (0, common_1.Post)('/create_wallet/:accountId/:asset'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VaultAsset_1.VaultAsset]),
    __metadata("design:returntype", Promise)
], FireblocksController.prototype, "createWallet", null);
__decorate([
    (0, common_1.Get)('/getVaultAccounts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FireblocksController.prototype, "getVaultAccounts", null);
__decorate([
    (0, common_1.Get)('/get_whitelisted_wallets'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FireblocksController.prototype, "getWhiteListedWallets", null);
__decorate([
    (0, common_1.Get)('/get_external_wallets'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FireblocksController.prototype, "getExternalWallets", null);
__decorate([
    (0, common_1.Get)('/get_whitelisted_wallets/:walletId'),
    __param(0, (0, common_1.Param)('walletId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FireblocksController.prototype, "getAllAssetsInWhitelistedWallet", null);
__decorate([
    (0, common_1.Get)('/getUsers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FireblocksController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('/supported_assets'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FireblocksController.prototype, "getSupportedAssets", null);
__decorate([
    (0, common_1.Get)('/get_txn/:txnId'),
    __param(0, (0, common_1.Param)('txnId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FireblocksController.prototype, "getTxn", null);
__decorate([
    (0, common_1.Get)('/get_vault_account/:accountId'),
    __param(0, (0, common_1.Param)('accountId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FireblocksController.prototype, "getVaultAccount", null);
__decorate([
    (0, common_1.Post)('/get_balance'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VaultAsset_1.VaultAsset]),
    __metadata("design:returntype", Promise)
], FireblocksController.prototype, "getBalance", null);
__decorate([
    (0, common_1.Get)('/get_transfer_tickets'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FireblocksController.prototype, "getTransferTickets", null);
FireblocksController = __decorate([
    (0, swagger_1.ApiTags)('Fireblocks'),
    (0, common_1.Controller)('api/v1/fireblocks'),
    __metadata("design:paramtypes", [app_service_1.FireblocksService])
], FireblocksController);
exports.FireblocksController = FireblocksController;
//# sourceMappingURL=app.controller.js.map