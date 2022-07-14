import { ApiProperty } from '@nestjs/swagger';

export class Txn {

    @ApiProperty()
    asset: string;

    @ApiProperty()
    source: string;

    @ApiProperty()
    dest: string;

    @ApiProperty()
    amount: string;

    @ApiProperty()
    fee: string;

    @ApiProperty()
    note: string;

    constructor(asset, source, dest, fee, note){
        this.asset = asset;
        this.source = source;
        this.dest = dest
        this.fee = fee
        this.note = note;
    }
}