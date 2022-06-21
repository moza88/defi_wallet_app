import { Controller, Get } from '@nestjs/common';
import { BitgoService } from '../../services/bitgo/app.service';

@Controller('bitgo')
export class BitgoController {
  constructor(private readonly appService: BitgoService) {}

  @Get('/audit-logs')
  getAuditLogs(): string {
    return this.appService.getAuditLogs();
  }


}
