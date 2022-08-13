import { Injectable, Logger } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {map} from "rxjs";
import {bitgo, getOptions} from '../../../config/bitgo.config';

@Injectable()
export class NodeBlockdaemonTxAuditService {

    constructor(private readonly httpService: HttpService) {}

    private readonly logger = new Logger(NodeBlockdaemonTxAuditService.name);


    getTxnConfirmations(txnId) {
        this.logger.log("Getting audit logs");
        const req_url = process.env.BLOCKDAEMON_SERVER_URL + "/bitcoin/testnet/tx" + txnId + "/0";

        return this.httpService.get(req_url, getOptions(req_url)).pipe(
            map(response => response.data)
        );
    }



}
