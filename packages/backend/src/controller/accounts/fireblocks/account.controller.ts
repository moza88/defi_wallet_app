import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { FireblocksAccountService } from '../../../services/accounts/fireblocks/account.service';
import {ApiHeader, ApiTags} from "@nestjs/swagger";

@ApiTags('Fireblocks')
@Controller('api/v1/fireblocks')
export class FireblocksAccountController {
  constructor(private readonly appService: FireblocksAccountService) {}

  @Get('/getUsers')
  getUsers() {
    return this.appService.getUsers();
  }

  @Get('/supported_assets')
  getSupportedAssets() {
    return this.appService.getSupportedAssets();
  }


}
