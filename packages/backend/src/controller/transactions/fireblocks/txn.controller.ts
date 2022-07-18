import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { FireblocksTxnService } from '../../../services/transactions/fireblocks/txn.service';
import {ApiTags} from "@nestjs/swagger";
import {VaultAsset} from "../../../model/wallets/fireblocks/VaultAsset";
import {Txn} from "../../../model/transactions/fireblocks/Txn";
import { VaultDescript} from "../../../model/wallets/fireblocks/VaultDescript";

@Controller('api/v1/fireblocks')
export class FireblocksTxnController {
  constructor(private readonly appService: FireblocksTxnService) {}

  /**
   * Transfers an asset from one vault to another vault.
   * @param txn
   */
  @ApiTags('Fireblocks Transactions - Create Vault to Vault Transaction')
  @Post('/createTxnVaultToVault')
  async createTxnVaultToVault(
      @Body() txn: Txn
  ) {
    return this.appService.createTxnVaultToVault(txn);
  }

  /**
   * Transfers an asset from one vault to another vault.
   * @param txn
   */
  @ApiTags('Fireblocks Transactions - Create Vault to Address Transaction')
  @Post('/createTxnVaultToAddress')
  async createTxnVaultToAddress(
      @Body() txn: Txn
  ) {
    return this.appService.createTxnVaultToExtWallet(txn);
  }

  @ApiTags('Fireblocks Transactions - Get Vault Transactions')
  @Post('/get_vault_transactions')
    async getVaultTransactions(
        @Body() vaultDescript: VaultDescript
    ): Promise<any> {
        console.log('vaultDescript', vaultDescript);
        return this.appService.getTransactions(vaultDescript.assets, vaultDescript.sourceId);
  }

  @ApiTags('Fireblocks Transactions - Get Transactions by Transaction ID')
  @Get('/get_txn/:txnId')
  getTxn(
      @Param('txnId') txnId: string,
    ) {
        return this.appService.getTxnById(txnId);
  }


  @ApiTags('Fireblocks Transactions - Get Balance')
  @Post('/get_balance')
    async getBalance(
        @Body() vaultAsset: VaultAsset
    ) {
        return this.appService.getBalance(vaultAsset.id, vaultAsset.asset);
    }

  @ApiTags('Fireblocks Transactions - Get Transfer Tickets')
  @Get('/get_transfer_tickets')
  async getTransferTickets() {
    return this.appService.getTransferTickets();
  }



}
