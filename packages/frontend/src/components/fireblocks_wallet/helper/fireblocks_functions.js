import {useState} from "react";


export function getAllBalances(coin, wallets) {
    let balances = new Map()

    console.log("getting all balances")
    console.log(wallets)
    for(const element of wallets) {

        console.log(element.id)
        console.log(getBalance(coin, element.id))
        // const balanceX = getBalance(coin, element.id)
        //console.log('balance for ' + element.id + ': ' + balanceX)
        //balances = (balance => [{...balance, [element.id]: getBalance(coin, element.id)}])
        //setBalances(balances => ({...balances, [element.id]: getBalance(coin, element.id)}))
        balances.set(element.id, getBalance(coin, element.id));
    }

    console.log(balances)

    return balances;
}

export function test() {
    return 'test';
}

export async function getBalance(coin, walletId) {

    const req_url = process.env.NEXT_PUBLIC_FIREBLOCKS_SERVER + "/get_balance";

    return fetch(req_url, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            id: walletId,
            asset: coin,
        })
    }).then(response => response.json())
        .then(data => data.balance)
        .then(balance => {
            console.log('balance for ' + walletId + ': ' + balance)

            return balance;
        }).catch(error => {
            console.log(error)
        })

}