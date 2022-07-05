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

export function test() {
    return 'test';
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