import { BitgoService } from '../../services/bitgo/app.service';
export declare class BitgoController {
    private readonly appService;
    constructor(appService: BitgoService);
    getAuditLogs(): string;
}
