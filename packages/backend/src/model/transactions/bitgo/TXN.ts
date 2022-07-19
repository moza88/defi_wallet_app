import { ApiProperty } from '@nestjs/swagger';

export class TXN {
    @ApiProperty()
    readonly coin: string;

    @ApiProperty()
    readonly walletId: string;

    @ApiProperty()
    readonly amount: string;

    @ApiProperty()
    readonly destAddress: string;

    @ApiProperty()
    readonly password: string;
}