import { ApiProperty } from '@nestjs/swagger';

export class VaultWalletParams {

    @ApiProperty()
    vaultName: string;

    @ApiProperty()
    asset: string;

    constructor(vaultName: string, asset: string) {
        this.vaultName = vaultName;
        this.asset = asset;
    }
}