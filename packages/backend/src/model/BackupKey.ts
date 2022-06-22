import { ApiProperty } from '@nestjs/swagger';

export class BackupKey {

    @ApiProperty()
    pubKey: string;

    @ApiProperty()
    privKey: string;

    constructor(pubKey: string, privKey: string) {
        this.pubKey = pubKey;
        this.privKey = privKey;
    }
}