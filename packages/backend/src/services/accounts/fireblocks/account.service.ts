import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {FireblocksSDK, PeerType, TransactionArguments, TransactionStatus, VaultAccountsFilter} from "fireblocks-sdk";
import {join} from 'path';
import {NewWallet} from "../../../model/wallets/fireblocks/NewWallet";
import {Txn} from "../../../model/transactions/fireblocks/Txn";
import fs = require('fs');
import {fireblocks} from "../../../config/fireblocks.config";

@Injectable()
export class FireblocksAccountService {

    private readonly logger = new Logger(FireblocksAccountService.name);

    constructor(private readonly httpService: HttpService) {
    }

    async getUsers() {
        this.logger.log("Getting users");
        return fireblocks().getUsers();
    }

    async getSupportedAssets() {

        const supportedAssets = await fireblocks().getSupportedAssets();

        let test_supportedAssets = [];
        for (const element of supportedAssets) {
            if (element.id.substring(element.id.length - 4, element.id.length) === 'TEST') {
                test_supportedAssets.push(element);
            }
        }
        return test_supportedAssets;
    }
}


