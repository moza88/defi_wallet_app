import {QueryClient, useQuery} from "react-query";
import {doc} from "firebase/firestore";
import {useState} from "react";

const client = new QueryClient();

export function createWallet (coin, label, passphrase) {
    const [walletInfo, setWalletInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log(label, passphrase);

    fetch(process.env.NEXT_PUBLIC_BITGO_SERVER + '/create_wallet/' + "coin=" + coin, {
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
          setWalletInfo(walletInfo);
          setLoading(false);
        })
      .catch(error => {
        return error;
    });
    return { walletInfo, loading };
}