import { FireblocksService } from '../../services/fireblocks/app.service';
export declare class FireblocksController {
    private readonly appService;
    constructor(appService: FireblocksService);
    getHello(): Promise<import("fireblocks-sdk").WalletContainerResponse<import("fireblocks-sdk").InternalWalletAsset>[]>;
}
