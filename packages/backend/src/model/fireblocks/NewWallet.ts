import { ApiProperty } from '@nestjs/swagger';

export class NewWallet {

    @ApiProperty()
    id: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    legacyAddress: string;

    @ApiProperty()
    tag: string;

    constructor(id, address, legacyAddress, tag){
        this.id = id;
        this.address = address;
        this.legacyAddress = legacyAddress
        this.tag = tag;
    }
}