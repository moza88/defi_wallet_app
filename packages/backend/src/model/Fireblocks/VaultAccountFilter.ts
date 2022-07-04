import { ApiProperty } from '@nestjs/swagger';

export class VaultAccountFilter {

    @ApiProperty()
    namePrefix?: string;

    @ApiProperty()
    nameSuffix?: string;

    @ApiProperty()
    minAmountThreshold?: number;

    @ApiProperty()
    assetId?: string;


    constructor(namePrefix, nameSuffix, minAmountThreshold, assetId){
        this.namePrefix = namePrefix;
        this.nameSuffix = nameSuffix;
        this.minAmountThreshold = minAmountThreshold
        this.assetId = assetId
    }
}