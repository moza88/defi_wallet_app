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
exports.NewWallet = void 0;
const swagger_1 = require("@nestjs/swagger");
class NewWallet {
    constructor(walletId, receiveAddress, keychainBackupXPrv, keychainEncryptedXPrv, walletLabel) {
        this.walletId = walletId;
        this.receiveAddress = receiveAddress;
        this.keychainEncryptedXPrv = keychainEncryptedXPrv;
        this.keychainBackupXPrv = keychainBackupXPrv;
        this.walletLabel = walletLabel;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], NewWallet.prototype, "walletId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], NewWallet.prototype, "receiveAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], NewWallet.prototype, "keychainEncryptedXPrv", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], NewWallet.prototype, "keychainBackupXPrv", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], NewWallet.prototype, "walletLabel", void 0);
exports.NewWallet = NewWallet;
//# sourceMappingURL=NewWallet.js.map