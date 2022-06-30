import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {FireblocksSDK} from "fireblocks-sdk";
import {join} from 'path';
import fs = require('fs');

//const apiSecret = fs.readFileSync(join(process.cwd(), './src/services/fireblocks/fireblocks_secret.key')).toString();
function fireblocks() {
    const apiSecret = fs.readFileSync(join(process.cwd(), './src/services/fireblocks/fireblocks_secret.key')).toString();
    console.log(apiSecret);
    return new FireblocksSDK(apiSecret, process.env.FIREBLOCKS_ACCESS_TOKEN);
}

@Injectable()
export class FireblocksService {

    constructor(private readonly httpService: HttpService) {}

    async getWhitelistedWallets() {

        return await fireblocks().getInternalWallets();

    }


}
