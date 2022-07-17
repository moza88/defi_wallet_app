import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {FireblocksSDK, PeerType, TransactionArguments, TransactionStatus, VaultAccountsFilter} from "fireblocks-sdk";
import {join} from 'path';
import {NewWallet} from "../../../model/fireblocks/NewWallet";
import {Txn} from "../../../model/fireblocks/Txn";
import fs = require('fs');
import {fireblocks} from "../../config/fireblocks.config";

@Injectable()
export class FireblocksAccountService {

    constructor(private readonly httpService: HttpService) {
    }

    async getUsers() {
        return fireblocks().getUsers();
    }

    async getSupportedAssets() {
        return fireblocks().getSupportedAssets();
    }
}


