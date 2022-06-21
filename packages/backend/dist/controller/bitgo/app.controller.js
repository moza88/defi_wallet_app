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
exports.BitgoController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("../../services/bitgo/app.service");
const rxjs_1 = require("rxjs");
const WalletParams_1 = require("../../model/WalletParams");
const TXN_1 = require("../../model/TXN");
const Auth_1 = require("../../model/Auth");
let BitgoController = class BitgoController {
    constructor(appService) {
        this.appService = appService;
    }
    getAuditLogs() {
        return this.appService.getAuditLogs();
    }
    getWalletList(coin) {
        return this.appService.getWalletList(coin);
    }
    deleteWallet(coin, walletId) {
        this.appService.deleteWallet(coin, walletId);
    }
    createWallet(walletParams, coin) {
        this.appService.createWallet(coin, walletParams);
    }
    login(auth) {
        this.appService.login(auth.username, auth.password);
    }
    logout() {
        this.appService.logout();
    }
    sendTxn(txn, coin) {
        this.appService.sendTxn(coin, txn);
    }
    getAddressList(coin, walletId) {
        return this.appService.getAddressList(coin, walletId);
    }
    getTxnHistory(coin, walletId) {
        return this.appService.getTxnHistory(coin, walletId);
    }
};
__decorate([
    (0, common_1.Get)('/audit_log'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], BitgoController.prototype, "getAuditLogs", null);
__decorate([
    (0, common_1.Get)('/wallet_list/coin=:coin'),
    __param(0, (0, common_1.Param)('coin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], BitgoController.prototype, "getWalletList", null);
__decorate([
    (0, common_1.Get)('/delete_wallet/coin=:coin/walletId=:walletId'),
    __param(0, (0, common_1.Param)('coin')),
    __param(1, (0, common_1.Param)('walletId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BitgoController.prototype, "deleteWallet", null);
__decorate([
    (0, common_1.Post)('/create_wallet/coin=:coin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('coin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WalletParams_1.WalletParams, String]),
    __metadata("design:returntype", void 0)
], BitgoController.prototype, "createWallet", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Auth_1.Auth]),
    __metadata("design:returntype", void 0)
], BitgoController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('/logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BitgoController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('/send_txn/coin=:coin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('coin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TXN_1.TXN, String]),
    __metadata("design:returntype", void 0)
], BitgoController.prototype, "sendTxn", null);
__decorate([
    (0, common_1.Get)('/address_list/coin=:coin/walletId=:walletId'),
    __param(0, (0, common_1.Param)('coin')),
    __param(1, (0, common_1.Param)('walletId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", rxjs_1.Observable)
], BitgoController.prototype, "getAddressList", null);
__decorate([
    (0, common_1.Get)('/txn_history/coin=:coin/walletId=:walletId'),
    __param(0, (0, common_1.Param)('coin')),
    __param(1, (0, common_1.Param)('walletId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", rxjs_1.Observable)
], BitgoController.prototype, "getTxnHistory", null);
BitgoController = __decorate([
    (0, common_1.Controller)('api/v1/bitgo'),
    __metadata("design:paramtypes", [app_service_1.BitgoService])
], BitgoController);
exports.BitgoController = BitgoController;
//# sourceMappingURL=app.controller.js.map