import { HttpService } from "@nestjs/axios";
export declare class FireblocksService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getVaultAccounts(): Promise<import("fireblocks-sdk").WalletContainerResponse<import("fireblocks-sdk").InternalWalletAsset>[]>;
}
