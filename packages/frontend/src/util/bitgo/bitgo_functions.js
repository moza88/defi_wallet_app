import {QueryClient, useQuery} from "react-query";
import {doc} from "firebase/firestore";
import {useState} from "react";

export const createWallet = (label, passphrase, coin) => {
    console.log(label, passphrase);

    return fetch(process.env.NEXT_PUBLIC_BITGO_SERVER + '/create_wallet/' + "coin=" + coin, {
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

export function transferFunds(txn, amount) {
    const req_url = process.env.NEXT_PUBLIC_BITGO_SERVER + "/send_txn";
    console.log(req_url);

    console.log(amount);

    return fetch(req_url, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(txn)
    }).then(r => {

        console.log(r);
        return r;
    }).catch((error) => { console.log(error)})
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