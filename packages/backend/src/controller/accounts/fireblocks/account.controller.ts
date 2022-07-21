import {Body, Controller, Delete, Get, Logger, Param, Post} from '@nestjs/common';
import { FireblocksAccountService } from '../../../services/accounts/fireblocks/account.service';
import {ApiHeader, ApiOperation, ApiTags} from "@nestjs/swagger";
import {getError} from "../../error/fireblocks/getError";

@Controller('api/v1/fireblocks')
export class FireblocksAccountController {
  constructor(private readonly appService: FireblocksAccountService) {}

  private readonly logger = new Logger(FireblocksAccountController.name);

  @ApiTags('Fireblocks Accounts - All Users')
  @Get('/getUsers')
  getUsers() {
    return this.appService.getUsers()
        .catch((e) => {
            this.logger.log(e);
            return getError(e);
        });
  }

  @ApiTags('Fireblocks Accounts - All Supported Assets')
  @Get('/supported_assets')
  getSupportedAssets() {
    return this.appService.getSupportedAssets()
        .catch((e) => {
            this.logger.log(e);
            return getError(e);
        });
  }


}
