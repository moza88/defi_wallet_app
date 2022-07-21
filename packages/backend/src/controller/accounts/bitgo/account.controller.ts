import {Body, Controller, Delete, Get, Logger, Param, Post} from '@nestjs/common';
import {Observable} from "rxjs";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import { WalletParams} from "../../../model/wallets/bitgo/WalletParams";
import {TXN} from "../../../model/transactions/bitgo/TXN";
import {NewWallet} from "../../../model/wallets/bitgo/NewWallet";
import {WalletShare} from "../../../model/wallets/bitgo/WalletShare";
import {BitgoAccountService} from "../../../services/accounts/bitgo/account.service";
import {getError} from "../../error/fireblocks/getError";

@Controller('api/v1/bitgo')
export class BitgoAccountController {
    constructor(private readonly appService: BitgoAccountService) {}

    private readonly logger = new Logger(BitgoAccountController.name);

    @ApiTags('Bitgo Accounts - Audit Log')
    @ApiOperation({description: 'Bitgo Accounts - Get Wallets'})
    @Get('/audit_log')
    getAuditLogs(){
        return this.appService.getAuditLogs();
    }

}
