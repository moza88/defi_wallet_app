import { Test, TestingModule } from '@nestjs/testing';
import { BitgoAccountService } from '../../../services/accounts/bitgo/account.service';
import {HttpModule} from "@nestjs/axios";

/*
  Created this test by referring to the docs at:
  https://tkssharma.com/unit-testing-nestjs-controllers-and-services/
 */
describe('BitgoAccountsService', () => {
    let bitgoAccountService: BitgoAccountService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BitgoAccountService],
            imports: [HttpModule],
        }).compile();

        bitgoAccountService = module.get<BitgoAccountService>(BitgoAccountService);
    });

/*    it('ApiService - should be defined', () => {
        expect(bitgoAccountService).toBeDefined();
    });

    it('ApiService - should be defined', () => {
        expect(bitgoAccountService.getAuditLogs()).not.toBeNull();
    });*/
});