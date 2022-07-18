import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {FireblocksSDK, PeerType, TransactionArguments, TransactionStatus, VaultAccountsFilter} from "fireblocks-sdk";
import {join} from 'path';
import {Txn} from "../../../model/transactions/fireblocks/Txn";
import fs = require('fs');
import {fireblocks} from "../../../config/fireblocks.config";

@Injectable()
export class FireblocksTxnService {

    constructor(private readonly httpService: HttpService) {}

    private readonly logger = new Logger(FireblocksTxnService.name);


    async getAllTxns(accountId: string) {

        this.logger.log("Getting all transactions for account: " + accountId);
        return fireblocks().getVaultAccountById(accountId);
    }

    async getTxnByExternalId(txnId: string) {
        this.logger.log("Getting transaction by external id: " + txnId);

        return fireblocks().getTransactionByExternalTxId(txnId);
    }

    async getTxnById(txnId: string) {
        this.logger.log("Getting transaction by id: " + txnId);

        return fireblocks().getTransactionById(txnId);
    }

    async getTransactions(sourceId: string, assets: string) {
        this.logger.log("Getting transactions for account: " + sourceId);

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
        this.logger.log("Getting transfer tickets");

        return fireblocks().getTransferTickets();
    }

    async getBalance(id: string, asset: string) {
        this.logger.log("Getting balance for account: " + id);

        return fireblocks().getVaultAccountAsset(id, asset);
    }

    async getGasStation(asset: string) {
        this.logger.log("Getting gas station for asset: " + asset);

        return fireblocks().getGasStationInfo(asset);
    }

    async createTxnVaultToVault(txn: Txn) {
        this.logger.log("Creating transaction for account: " + txn.source);

        this.logger.log("Transaction data: " + JSON.stringify(txn));

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

        this.logger.log("TXN Payload data: " + JSON.stringify(payload));

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
        this.logger.log("Creating vault to external wallet transaction for account: " + txn.source);
        this.logger.log("Transaction data: " + JSON.stringify(txn));

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

        this.logger.log("TXN Payload data: " + JSON.stringify(payload));

        return fireblocks().createTransaction(payload).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
            return err;
        })
    }
}


