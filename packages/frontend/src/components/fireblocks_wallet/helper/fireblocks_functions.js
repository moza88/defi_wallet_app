import {useState} from "react";


export async function getAllBalances(coin, wallets) {
    let balances = new Map()

    console.log("getting all balances")
    console.log(wallets)

    for(const element of wallets) {

        //console.log(element.id)
        await getBalance(coin, element.id).then(
            (balance) => {
                //console.log(balance)
                balances.set(element.id, balance)
            }
        )
    }
    //console.log(balances)

    return balances;
}

export function getBalance(coin, walletId) {

    const req_url = process.env.NEXT_PUBLIC_FIREBLOCKS_SERVER + "/get_balance";

    return fetch(req_url, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: walletId,
            asset: coin,
        })
    }).then(response => response.json())
        .then(data => data.balance)
        .then((balance)  => {
            //console.log('balance for ' + walletId + ': ' + balance)
            return balance

        }).catch(error => {
            console.log(error)
        })
}

export const createWallet = (vaultName, asset) => {
    console.log(vaultName, asset);

    return fetch(process.env.NEXT_PUBLIC_FIREBLOCKS_SERVER + '/create_vault_wallet/', {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            vaultName: vaultName,
            asset: asset
        })
    }).then(response => response.json())
        .then(walletInfo => {
            console.log(walletInfo)

            return walletInfo;
        });
}

export const getWallets = () => {
    const req_url = process.env.NEXT_PUBLIC_FIREBLOCKS_SERVER + "/getVaultAccounts";
    console.log(req_url);

    let wallets = [];

    return fetch(req_url, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            namePrefix: "WF",
            nameSuffix: "",
            minAmountThreshold: 0,
            assetId: ""
        })
    }).then(response => {
        // response.json()
        console.log(response.json()
            .then(data => {
                console.log(data.accounts[0].name)
                for(const account of data.accounts) {
                    wallets = [...wallets, account]
                    console.log(account.name)
                    return wallets;
                }
            }))
    }).catch((error)=> {
        console.log(error)
    })
}

