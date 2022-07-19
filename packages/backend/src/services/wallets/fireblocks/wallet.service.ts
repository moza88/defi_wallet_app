import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {FireblocksSDK, PeerType, TransactionArguments, TransactionStatus, VaultAccountsFilter} from "fireblocks-sdk";
import {NewWallet} from "../../../model/wallets/fireblocks/NewWallet";
import {fireblocks} from "../../../config/fireblocks.config";


@Injectable()
export class FireblocksWalletService {

    private readonly logger = new Logger(FireblocksWalletService.name);

    constructor(private readonly httpService: HttpService) {}

    async getWhitelistedWallets() {
        this.logger.log("Getting whitelisted wallets");
        return fireblocks().getInternalWallets();
    }

    async getExternalWallets() : Promise<any> {
        this.logger.log("getting external wallets ");
        return fireblocks().getExternalWallets();
    }

    async getAllAssetsInWhitelistedWallet(walletId: string) {
        this.logger.log("Getting all assets in whitelisted wallet");

        return await fireblocks().getInternalWallet(walletId);
    }

    async getVaultAccounts(vaultAccountFilter: VaultAccountsFilter) {
        this.logger.log("Getting vault accounts using the filter: " + JSON.stringify(vaultAccountFilter));

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

    async createVault(vaultName: string, customerRefId: string): Promise<string> {
        this.logger.log("Creating vault: " + vaultName);

        const vault = await fireblocks().createVaultAccount(vaultName, false, customerRefId)
        return vault.id;
    }

    async getVaultAccountById(id: string) {
        this.logger.log("Getting vault account by id: " + id);

        return fireblocks().getVaultAccountById(id);
    }

    async createNewWalletInVault(id: string, asset: string): Promise<NewWallet> {
        this.logger.log("Creating new wallet in vault: " + id);

        const walletInstance = await fireblocks().createVaultAsset(id, asset)

        this.logger.log("Wallet address: " + walletInstance.address);

        return new NewWallet(walletInstance.id, walletInstance.address, '', '');
    }

    async getBalance(id: string, asset: string) {
        this.logger.log("Getting balance for account: " + id);

        return fireblocks().getVaultAccountAsset(id, asset);
    }

    async generateAddress(id: string, asset: string) {
        this.logger.log("Generating address for account: " + id);

        return fireblocks().generateNewAddress(id, asset);
    }

    async generateDepositAddress(id: string, asset: string, description: string, customerRefId: string) {
        this.logger.log("Generating deposit address for account: " + id);

        return fireblocks().generateNewAddress(id, asset, description, customerRefId);
    }

    async getGasStation(asset: string) {
        this.logger.log("Getting gas station for asset: " + asset);

        return fireblocks().getGasStationInfo(asset);
    }

    async createInternalWallet(walletName: string, customerId: string) {
        this.logger.log("Creating internal wallet: " + walletName + " for customer: " + customerId);

        return fireblocks().createInternalWallet(walletName, customerId);
    }

    async createExternalWallet(walletName: string, customerId: string) {
        this.logger.log("Creating external wallet: " + walletName + " for customer: " + customerId);

        return fireblocks().createExternalWallet(walletName, customerId);
    }

}


