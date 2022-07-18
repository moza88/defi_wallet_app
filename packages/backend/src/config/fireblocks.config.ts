import {join} from "path";
import {FireblocksSDK} from "fireblocks-sdk";
import * as fs from "fs";

export function fireblocks() {
    const apiSecret = fs.readFileSync(join(process.cwd(), process.env.FIREBLOCKS_CERT_PATH)).toString();
    return new FireblocksSDK(apiSecret, process.env.FIREBLOCKS_ACCESS_TOKEN);
}