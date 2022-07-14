import { ApiProperty } from '@nestjs/swagger';

export class VaultDescript {

    @ApiProperty()
    assets: string;

    @ApiProperty()
    sourceId: string;


    constructor(assets, sourceId){
        this.assets = assets;
        this.sourceId = sourceId;
    }
}