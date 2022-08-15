import {QueryClient, useQuery} from "react-query";
import {doc} from "firebase/firestore";
import {useState} from "react";
import {getBalance} from "../fireblocks/fireblocks_functions";

export const createWallet = (label, passphrase, coin) => {
    console.log(label, passphrase);

    const req_url = process.env.NEXT_PUBLIC_BITGO_SERVER + '/create_wallet/' + "coin=" + coin
    console.log(req_url);

    return fetch(req_url, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            label: label,
            passphrase: passphrase
        })
    }).then(response => response.json())
        .then(walletInfo => {
            console.log(walletInfo)
            return walletInfo;

        })
        .catch(error => {
            console.log(error)
        });
}

export const deleteWallet = (walletId, coin) => {

    console.log("deleting wallet " + walletId)

    var req_url = process.env.NEXT_PUBLIC_BITGO_SERVER + "/delete_wallet/" +
        "coin=" +coin + "/" + "walletId=" + walletId


    return fetch(req_url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function shareWallet(walletShare) {
    var req_url = process.env.NEXT_PUBLIC_BITGO_SERVER +"/share_wallet";
    console.log(req_url);

    fetch(req_url, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(walletShare)
    }).then(r => r.json)
        .then(data => {
            console.log(data)
        }).catch((error) => { console.log(error)})
}

export function transferFunds(txn) {
    const req_url = process.env.NEXT_PUBLIC_BITGO_SERVER + "/send_txn";
    console.log(req_url);

    return fetch(req_url, {
        method: 'POST',
        headers: {
            Accept: "application/json",
                    "Content-Type": "application/json"
        },
        body: JSON.stringify(txn)
    }).then(r => r)
      .then(data => {
            console.log(data)
            return data;
        }).catch((error) => {
            console.log(error)
        })
}

export const getTxnHistory = (coin, walletId) => {
    var req_url = process.env.NEXT_PUBLIC_BITGO_SERVER + "/txn_history" + "/coin=" + coin + "/walletId=" + walletId;
    console.log(req_url);

    return fetch(req_url,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data;
        }).catch((error) => { console.log(error)})

}

export function getWallets(coin) {
    var req_url = process.env.NEXT_PUBLIC_BITGO_SERVER +"/wallet_list" + "/coin=" + coin;
    console.log(req_url);

    return fetch(req_url)
        .then(response => response.json())
        .then(data => {

            return data.wallets
           // setWallets(data.wallets)

        })
        .catch((error) => {
            console.log(error)
        })
}

export function createNewAddress(coin, walletId) {
    var req_url = process.env.NEXT_PUBLIC_BITGO_SERVER + "/create_address" + "/coin=" + coin + "/walletId=" + walletId;
    console.log(req_url);

    return fetch(req_url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data
        }).catch((error) => { console.log(error)})
}

export function getAddresses(coin, walletId) {
    var req_url = process.env.NEXT_PUBLIC_BITGO_SERVER + "/address_list" + "/coin=" + coin + "/walletId=" + walletId;
    console.log("Get Addresses: " + req_url);

    return fetch(req_url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data.addresses
        }).catch((error) => { console.log(error)})
}

export function getAddressBalance(coin, walletId, address) {
    var req_url = process.env.NEXT_PUBLIC_BITGO_SERVER + "/get_address" + "/coin=" + coin + "/walletId=" + walletId + "/address=" + address;
//    console.log("Get Address Balance: " + req_url);

    return fetch(req_url)
        .then(response => response.json())
        .then((data) => data)
        .then(data => {
           // console.log(data)
            return data
        }).catch((error) => { console.log(error)})
}

export async function getAllAddressesBalance(coin, walletId) {
    //console.log("Get All Addresses Balance: " + coin + " " + walletId);
    let balances = []
    getAddresses(coin, walletId).then(
        (addresses) => {
            for (const element of addresses) {
                getAddressBalance(coin, walletId, element.id).then(
                    (balance) => {
                        //balances = balances.concat(balance)
                        //console.log(balance)
                        balances.push(balance)
                        //addressBalance.set(element.id, balance)
                    }
                )}
        }).catch((error) => {
            console.log(error)
        })
   // console.log(balances)
    return balances;

}

export async function getAllBalances(coin, walletId, wallets) {
    //console.log("Get All Addresses Balance: " + coin + " " + walletId);
    let balances = []
    for (const element of wallets) {
        console.log("address: " + element)
        getAddressBalance(coin, walletId, element).then(
            (balance) => {
                //balances = balances.concat(balance)
                //console.log(balance)
                balances.push(balance)
                //balances = [...balances, balance]
                //balances = balances.concat(balance)
                //addressBalance.set(element.id, balance)
            }
        )}
    return balances;

}

export async function getAllWallets() {
    var req_url = process.env.NEXT_PUBLIC_BITGO_SERVER + "/get_all_wallets";

    console.log("Get all Wallets: " + req_url);

    return fetch(req_url, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
        .then(r => r.json())
        .then(data => {
            console.log(data.wallets)
            return data.wallets;
        }).catch((error) => { console.log(error)})
}