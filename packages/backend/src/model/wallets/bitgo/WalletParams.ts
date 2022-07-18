import { ApiProperty } from '@nestjs/swagger';

export class WalletParams {
    @ApiProperty()
    readonly label: string;

    @ApiProperty()
    readonly passphrase: string;
}