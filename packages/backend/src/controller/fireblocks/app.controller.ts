import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { FireblocksService } from '../../services/fireblocks/app.service';
import {VaultAccountResponse} from "fireblocks-sdk";

@Controller('api/v1/fireblocks')
export class FireblocksController {
  constructor(private readonly appService: FireblocksService) {}

/*  @Get('/get_vault_accounts')
  getVaultAccounts(): Promise<VaultAccountResponse[]> {
    return this.appService.getVaultAccounts();
  }*/

  @Get('/get_whitelisted_wallets')
  getWhiteListedWallets() {
    return this.appService.getWhitelistedWallets();
  }



}
