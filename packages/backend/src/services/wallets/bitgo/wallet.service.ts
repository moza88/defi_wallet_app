import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {map} from "rxjs";
import {WalletParams} from "../../../model/wallets/bitgo/WalletParams";
import {BitGo} from 'bitgo'
import axios from 'axios'
import {NewWallet} from "../../../model/wallets/bitgo/NewWallet";
import {BackupKey} from "../../../model/wallets/bitgo/BackupKey";
import {WalletShare} from "../../../model/wallets/bitgo/WalletShare";
import {bitgo, bitgoCoin, getOptions} from '../../../config/bitgo.config';


function getConfig()  {
    return {
        headers: {
            'Authorization': 'Bearer ' + process.env.BITGO_ACCESS_TOKEN,
        }
    };
}

@Injectable()
export class BitgoWalletService {

    constructor(private readonly httpService: HttpService) {}

    private readonly logger = new Logger(BitgoWalletService.name);

    getWalletList(coin: string) {
        const req_url = process.env.BITGO_SERVER_URL + coin + "/wallet/?limit=50";

        return this.httpService.get(req_url, getOptions(req_url)).pipe(
            map(response => response.data)
        );
    }

    async createWallet(coin: string, wallet_params: WalletParams) : Promise<NewWallet>{

        const label = wallet_params.label
        const passphrase = wallet_params.passphrase

        const walletOptions = {
            label,
            passphrase,
        };

        console.log(walletOptions);

        const wallet = await bitgoCoin(coin).wallets().generateWallet(walletOptions);

        const walletInstance = wallet.wallet;

        let newWallet = new NewWallet(walletInstance.id(), walletInstance.receiveAddress(), wallet.userKeychain.encryptedPrv, wallet.userKeychain.encryptedPrv, label)

        console.log(newWallet);

        return newWallet;
    }

    createBackupKey(coin){

        // this function takes one parameter - seed - if you want to create from your own entropy (recommended)
        const backupKey = bitgoCoin(coin).keychains().create();

        console.log('BACK THIS UP: ');
        console.log(`Pub - this is what you add in the browser under the I have a backup key option: ${backupKey.pub}`);

        // extremely sensitive material
        console.log(`Prv - SENSITIVE MATERIAL - this is what you need to save: ${backupKey.prv}`);

        return new BackupKey(backupKey.pub, backupKey.prv);
    }

    async deleteWallet(coin: string, wallet: string) {
        const req_url = process.env.BITGO_SERVER_URL + coin + "/wallet/" + wallet;

        console.log("deleting wallet " + wallet)

        const response = axios.delete(req_url, getConfig())
            .then((resp) => {
                console.log(resp)
            }).catch((error) => {
                console.log(error)
            })

        console.log(response)
        return response;

    }

    getAddressList(coin: string, wallet: string) {
        const req_url = process.env.BITGO_SERVER_URL + coin + "/wallet/" + wallet + "/addresses";

        return this.httpService.get(req_url, getOptions(req_url)).pipe(
            map(response => response.data)
        );
    }

    async getAddress(coin: string, walletId: string, address: string) {
        const walletInstance = await bitgoCoin(coin).wallets().get({id: walletId});

        return walletInstance.getAddress({address: address});
    }

    async walletTransfers(coin: string, walletId: string) {

        const walletInstance = await bitgoCoin(coin).wallets().get({id: walletId});

        return walletInstance.transfers();
    }

    async shareWallet(walletShare: WalletShare) {

        const walletInstance = await bitgoCoin(walletShare.coin).wallets().get({id: walletShare.walletId});

        return walletInstance.shareWallet({
            email: walletShare.email,
            walletPassphrase: walletShare.passphrase,
            permissions: walletShare.perms,
        }).catch((error) => console.log(error));
    }

    async getWallet(coin: string, walletId: string) {
        const walletInstance = await bitgoCoin
    }

    createAddress(coin: string, walletId: string) {

        this.logger.log("creating address for wallet " + walletId)

        const req_url = process.env.BITGO_SERVER_URL + coin + "/wallet/" + walletId + "/address";

        this.logger.log(req_url)
        return fetch(req_url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + process.env.BITGO_ACCESS_TOKEN,
            }
        })
        .then(response => response.json())
        .catch(error => console.log(error));
        //const response =  this.httpService.post(req_url );
    }

}
