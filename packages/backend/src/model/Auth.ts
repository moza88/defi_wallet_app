import { ApiProperty } from '@nestjs/swagger';

export class Auth {
    @ApiProperty()
    readonly username: string;

    @ApiProperty()
    readonly password: string;

}