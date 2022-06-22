import { ApiProperty } from '@nestjs/swagger';

export class NewWallet {

    @ApiProperty()
    walletId: string;

    @ApiProperty()
    receiveAddress: string;

    @ApiProperty()
    keychainEncryptedXPrv: string;

    @ApiProperty()
    keychainBackupXPrv: string;

    @ApiProperty()
    walletLabel: string;

    constructor(walletId, receiveAddress, keychainBackupXPrv, keychainEncryptedXPrv, walletLabel){
        this.walletId = walletId;
        this.receiveAddress = receiveAddress;
        this.keychainEncryptedXPrv = keychainEncryptedXPrv
        this.keychainBackupXPrv = keychainBackupXPrv;
        this.walletLabel = walletLabel;
    }
}