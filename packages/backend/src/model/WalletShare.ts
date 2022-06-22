import { ApiProperty } from '@nestjs/swagger';

export class WalletShare {
    @ApiProperty()
    readonly coin: string;

    @ApiProperty()
    readonly walletId: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly passphrase: string;

    @ApiProperty()
    readonly perms: string;
}