import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {FireblocksSDK, PeerType, TransactionArguments, TransactionStatus, VaultAccountsFilter} from "fireblocks-sdk";
import {NewWallet} from "../../../model/fireblocks/NewWallet";
import {fireblocks} from "../../config/fireblocks.config";


@Injectable()
export class FireblocksWalletService {

    constructor(private readonly httpService: HttpService) {}

    async getWhitelistedWallets() {
        return fireblocks().getInternalWallets();
    }

    async getExternalWallets() : Promise<any> {
        console.log("getting external wallets ");
        return fireblocks().getExternalWallets();
    }

    async getAllAssetsInWhitelistedWallet(walletId: string) {
        const wallet =  await fireblocks().getInternalWallet(walletId);
        console.log(wallet);
        return wallet;
    }

    async getVaultAccounts(vaultAccountFilter: VaultAccountsFilter) {
        console.log(vaultAccountFilter);

        return fireblocks().getVaultAccountsWithPageInfo(vaultAccountFilter)
            .then(res => {
                console.log(res.accounts);
                return res;
            })
            .catch(err => {
                console.log(err);
                return err;
            });
    }

    async getSupportedAssets() {
        return fireblocks().getSupportedAssets();
    }

    async createVault(vaultName: string, customerRefId: string): Promise<string> {
        const vault = await fireblocks().createVaultAccount(vaultName, false, customerRefId)
        return vault.id;
    }

    async getVaultAccountById(id: string) {
        return fireblocks().getVaultAccountById(id);
    }

    async createNewWalletInVault(id: string, asset: string): Promise<NewWallet> {
        const walletInstance = await fireblocks().createVaultAsset(id, asset)

        console.log(walletInstance.address);
        return new NewWallet(walletInstance.id, walletInstance.address, '', '');
    }

    async getBalance(id: string, asset: string) {
        return fireblocks().getVaultAccountAsset(id, asset);
    }

    async generateAddress(id: string, asset: string) {
        return fireblocks().generateNewAddress(id, asset);
    }

    async generateDepositAddress(id: string, asset: string, description: string, customerRefId: string) {
        return fireblocks().generateNewAddress(id, asset, description, customerRefId);
    }

    async getGasStation(asset: string) {
        return fireblocks().getGasStationInfo(asset);
    }

    async createInternalWallet(walletName: string, customerId: string) {
        return fireblocks().createInternalWallet(walletName, customerId);
    }

    async createExternalWallet(walletName: string, customerId: string) {
        return fireblocks().createExternalWallet(walletName, customerId);
    }

}


