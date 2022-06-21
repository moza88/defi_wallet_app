import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getAuditLogs() {
    var req_url = process.env.BITGO_SERVER_URL + "/auditlog";

    return "";
  }
}
