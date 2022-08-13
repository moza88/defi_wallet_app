import {Body, Controller, Delete, Get, Logger, Param, Post} from '@nestjs/common';
import { FireblocksAccountService } from '../../../services/accounts/fireblocks/account.service';
import {ApiHeader, ApiOperation, ApiTags} from "@nestjs/swagger";
import {getError} from "../../error/fireblocks/getError";

@Controller('api/v1/blockdaemon')
export class FireblocksAccountController {
  constructor(private readonly appService: FireblocksAccountService) {}

  private readonly logger = new Logger(FireblocksAccountController.name);

  @ApiTags('Blockdaemon Confirm Transaction')
  @Get('/getConfirmations')
  getUsers() {
    return this.appService.getUsers()
        .catch((e) => {
            this.logger.log(e);
            return getError(e);
        });
  }


}
