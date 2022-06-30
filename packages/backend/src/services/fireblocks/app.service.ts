import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {FireblocksSDK} from "fireblocks-sdk";
import {join} from 'path';
import fs = require('fs');

//const apiSecret = fs.readFileSync(join(process.cwd(), './src/services/fireblocks/fireblocks_secret.key')).toString();
function fireblocks() {
    const apiSecret = fs.readFileSync(join(process.cwd(), './src/services/fireblocks/fireblocks_secret.key')).toString();
    //console.log(apiSecret);
    return new FireblocksSDK(apiSecret, process.env.FIREBLOCKS_ACCESS_TOKEN);
}

@Injectable()
export class FireblocksService {

    constructor(private readonly httpService: HttpService) {}

    async getWhitelistedWallets() {

        return fireblocks().getInternalWallets();

    }

    async getExternalWallets() : Promise<any> {
        console.log("getting external wallets ");
        return fireblocks().getExternalWallets();
    }

    async getAllAssetsInWhitelistedWallet(walletId: string) {
        const wallet =  await fireblocks().getInternalWallet(walletId);
        console.log(wallet);
        return wallet;
    }

    async getAllTxns(accountId: string) {
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

    async getTxnById(txnId: string) {
        return fireblocks().getTransactionByExternalTxId(txnId);
    }

    async getTransferTickets() {
        return fireblocks().getTransferTickets();
    }

    async createVault(vaultName: string) {
        return fireblocks().createVaultAccount(vaultName);
    }

    async getVaultAccountById(id: string) {
        return fireblocks().getVaultAccountById(id);
    }

    async createVaultAsset(id: string, asset: string) {
        return fireblocks().createVaultAsset(id, asset);
    }
}


