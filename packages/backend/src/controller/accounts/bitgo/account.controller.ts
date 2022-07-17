import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {Observable} from "rxjs";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import { WalletParams} from "../../../model/WalletParams";
import {TXN} from "../../../model/TXN";
import {NewWallet} from "../../../model/NewWallet";
import {WalletShare} from "../../../model/WalletShare";
import {BitgoAccountService} from "../../../services/accounts/bitgo/account.service";

@Controller('api/v1/bitgo')
export class BitgoAccountController {
    constructor(private readonly appService: BitgoAccountService) {}

    @ApiTags('Bitgo Accounts - Audit Log')
    @ApiOperation({description: 'Bitgo Accounts - Get Wallets'})
    @Get('/audit_log')
    getAuditLogs(): Observable<any> {
        return this.appService.getAuditLogs();
    }

}
