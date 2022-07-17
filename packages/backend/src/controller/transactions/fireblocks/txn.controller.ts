import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { FireblocksTxnService } from '../../../services/transactions/fireblocks/txn.service';
import {ApiTags} from "@nestjs/swagger";
import {VaultAsset} from "../../../model/fireblocks/VaultAsset";
import {Txn} from "../../../model/fireblocks/Txn";
import { VaultDescript} from "../../../model/fireblocks/VaultDescript";

@ApiTags('Fireblocks')
@Controller('api/v1/fireblocks')
export class FireblocksTxnController {
  constructor(private readonly appService: FireblocksTxnService) {}

  /**
   * 3. Transfers an asset from one vault to another vault.
   * @param txn
   */
  @Post('/createTxnVaultToVault')
  async createTxnVaultToVault(
      @Body() txn: Txn
  ) {
    return this.appService.createTxnVaultToVault(txn);
  }

  /**
   * 3. Transfers an asset from one vault to another vault.
   * @param txn
   */
  @Post('/createTxnVaultToAddress')
  async createTxnVaultToAddress(
      @Body() txn: Txn
  ) {
    return this.appService.createTxnVaultToExtWallet(txn);
  }

  @Post('/get_vault_transactions')
    async getVaultTransactions(
        @Body() vaultDescript: VaultDescript
    ): Promise<any> {
        console.log('vaultDescript', vaultDescript);
        return this.appService.getTransactions(vaultDescript.assets, vaultDescript.sourceId);
  }


  @Get('/get_txn/:txnId')
  getTxn(
      @Param('txnId') txnId: string,
    ) {
        return this.appService.getTxnById(txnId);
  }


    @Post('/get_balance')
    async getBalance(
        @Body() vaultAsset: VaultAsset
    ) {
        return this.appService.getBalance(vaultAsset.id, vaultAsset.asset);
    }

  @Get('/get_transfer_tickets')
  async getTransferTickets() {
    return this.appService.getTransferTickets();
  }



}
