import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {FireblocksSDK, PeerType, TransactionArguments, TransactionStatus, VaultAccountsFilter} from "fireblocks-sdk";
import {join} from 'path';
import {Txn} from "../../../model/fireblocks/Txn";
import fs = require('fs');
import {fireblocks} from "../../config/fireblocks.config";

@Injectable()
export class FireblocksTxnService {

    constructor(private readonly httpService: HttpService) {}


    async getAllTxns(accountId: string) {
        return fireblocks().getVaultAccountById(accountId);
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

    async getTransactions(sourceId: string, assets: string) {
        console.log("getting transactions");
        const txns =  fireblocks().getTransactions({
            sourceType: PeerType.VAULT_ACCOUNT,
            sourceId: '0',
            status: TransactionStatus.COMPLETED,
            //sourceId: sourceId,
           // assets: assets,
            //sourceId: sourceId
            /*,
            sourceId: sourceID,
            assets: asset*/
        })
            .catch(err => {
                console.log(err);
                return err;
            })
        ;
        console.log(txns);

        return txns;

    }

    async getTransferTickets() {
        return fireblocks().getTransferTickets();
    }

    async getBalance(id: string, asset: string) {
        return fireblocks().getVaultAccountAsset(id, asset);
    }

    async getGasStation(asset: string) {
        return fireblocks().getGasStationInfo(asset);
    }

    async createTxnVaultToVault(txn: Txn) {
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

        return fireblocks().createTransaction(payload)
            .then(res => res.id)
            .then(res => {
                console.log(res);
                return res;
            })
            .catch(err => {
                console.log(err);
                return err;
            });
    }

    async createTxnVaultToExtWallet(txn: Txn) {
        console.log("creating txn")
        console.log(txn);
        const payload: TransactionArguments = {
            assetId: txn.asset,
            source: {
                type: PeerType.VAULT_ACCOUNT,
                id: String(txn.source)
            },
            destination: {
                type: PeerType.ONE_TIME_ADDRESS,
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


