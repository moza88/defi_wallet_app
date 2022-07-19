import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { FireblocksAccountService } from '../../../services/accounts/fireblocks/account.service';
import {ApiHeader, ApiOperation, ApiTags} from "@nestjs/swagger";

@Controller('api/v1/fireblocks')
export class FireblocksAccountController {
  constructor(private readonly appService: FireblocksAccountService) {}

  @ApiTags('Fireblocks Accounts - All Users')
  @Get('/getUsers')
  getUsers() {
    return this.appService.getUsers();
  }

  @ApiTags('Fireblocks Accounts - All Supported Assets')
  @Get('/supported_assets')
  getSupportedAssets() {
    return this.appService.getSupportedAssets();
  }


}
