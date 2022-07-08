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
/*            setNewWalletId(walletInfo.walletId)
            setRecieverAddress(walletInfo.receiveAddress)*/
        })
        .catch(error => {
            console.log(error)
        });
}
