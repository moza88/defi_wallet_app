import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {FireblocksSDK, PeerType, TransactionArguments, VaultAccountsFilter} from "fireblocks-sdk";
import {join} from 'path';
import {NewWallet} from "../../model/Fireblocks/NewWallet";
import {Txn} from "../../model/Fireblocks/Txn";
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

    async getVaultAccounts(vaultAccountFilter: VaultAccountsFilter) {
        console.log(vaultAccountFilter);

        return fireblocks().getVaultAccountsWithPageInfo(vaultAccountFilter)
            .then(res => {
                console.log(res);
                return res;
            })
            .catch(err => {
                console.log(err);
                return err;
            });
    }

    async getSupportedAssets() {
        return fireblocks().getSupportedAssets();
    }

    async getTxnByExternalId(txnId: string) {
        return fireblocks().getTransactionByExternalTxId(txnId);
    }

    async getTxnById(txnId: string) {
        return fireblocks().getTransactionById(txnId);
    }

    async getTransferTickets() {
        return fireblocks().getTransferTickets();
    }

    async createVault(vaultName: string, customerRefId: string): Promise<string> {
        const vault = await fireblocks().createVaultAccount(vaultName, false, customerRefId)
        return vault.id;
    }

    async getVaultAccountById(id: string) {
        return fireblocks().getVaultAccountById(id);
    }

    async createNewWalletInVault(id: string, asset: string): Promise<NewWallet> {
        const walletInstance = await fireblocks().createVaultAsset(id, asset)

        console.log(walletInstance.address);
        return new NewWallet(walletInstance.id, walletInstance.address, '', '');
    }

    async getBalance(id: string, asset: string) {
        return fireblocks().getVaultAccountAsset(id, asset);
    }

    async generateAddress(id: string, asset: string) {
        return fireblocks().generateNewAddress(id, asset);
    }

    async generateDepositAddress(id: string, asset: string, description: string, customerRefId: string) {
        return fireblocks().generateNewAddress(id, asset, description, customerRefId);
    }

    async getGasStation(asset: string) {
        return fireblocks().getGasStationInfo(asset);
    }

    async createInternalWallet(walletName: string, customerId: string) {
        return fireblocks().createInternalWallet(walletName, customerId);
    }

    async createExternalWallet(walletName: string, customerId: string) {
        return fireblocks().createExternalWallet(walletName, customerId);
    }

    async createTxn(txn: Txn) {
        console.log("creating txn")
        console.log(txn);
        const payload: TransactionArguments = {
            assetId: txn.asset,
            source: {
                type: PeerType.VAULT_ACCOUNT,
                id: String(txn.source)
            },
            destination: {
                type: PeerType.VAULT_ACCOUNT,
                id: String(txn.dest)
            },
            amount: String(txn.amount),
            fee: String(txn.fee),
            note: txn.note
        };

        console.log(payload);

        return fireblocks().createTransaction(payload).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
            return err;
        })
    }
}


