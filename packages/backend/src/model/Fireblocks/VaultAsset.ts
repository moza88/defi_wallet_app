import { ApiProperty } from '@nestjs/swagger';

export class VaultAsset {

    @ApiProperty()
    id: string;

    @ApiProperty()
    asset: string;

    constructor(id: string, asset: string) {
        this.id = id;
        this.asset = asset;
    }
}