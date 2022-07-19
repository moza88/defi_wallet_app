import { Test, TestingModule } from '@nestjs/testing';
import {HttpModule} from "@nestjs/axios";
import {BitgoWalletService} from "../../../services/wallets/bitgo/wallet.service";

class BitgoWalletServiceMock {
    createWallet() {
        return '';
    }
}
describe.only('BitgoWalletService', () => {
    let bitgoWalletService: BitgoWalletService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BitgoWalletService],
            imports: [HttpModule],
        }).compile();

        bitgoWalletService = module.get<BitgoWalletService>(BitgoWalletService);
    });

    it('ApiService - should be defined', () => {
        const result = ['test'];
        expect(bitgoWalletService).toBeDefined();
    });

/*    it('WalletService - should be labeled the way it is labeled', () => {
        let coin = 'tbtc';
        let wallet_params = {
            label: 'test',
            passphrase: 'test',
        }

        let expectedLabel = bitgoWalletService.createWallet(coin, wallet_params)
            .then(res => {
                expect(res.walletLabel).toBe(wallet_params.label);
            })

    });*/

/*    it('WalletService - should not have another label', () => {
        let coin = 'tbtc';
        let wallet_params = {
            label: 'test',
            passphrase: 'test',
        }

        let expectedLabel = bitgoWalletService.createWallet(coin, wallet_params)
            .then(res => {
                expect(res.walletLabel).toHaveBeenCalled();
            })

    });*/
});