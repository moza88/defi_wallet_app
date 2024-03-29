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
    console.log(balances)

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

export async function transferFunds(txn) {
    const req_url = process.env.NEXT_PUBLIC_FIREBLOCKS_SERVER + "/createTxnVaultToVault";

    console.log(txn);

    return fetch(req_url, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(txn)

    })
      .then(  async resp => {
          //console.log(await resp.json())
          return await resp.json();
      })
      .then(data => {
            console.log(data);
            return data;
            //return data;
      });
}

export function getWallets(coin) {
    const req_url = process.env.NEXT_PUBLIC_FIREBLOCKS_SERVER + "/getVaultAccounts";
    console.log(req_url);

    return fetch(req_url, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            //TODO: Change the suffix to WIM before the demo
            namePrefix: "WIM-",
            nameSuffix: "",
            minAmountThreshold: 0,
            assetId: ""
        })
    }).then(response => response.json())
      .then(data => data.accounts)
}

export async function getVaultInfo(accountId) {
    var req_url = process.env.NEXT_PUBLIC_FIREBLOCKS_SERVER +"/get_vault_account/" + accountId;
    console.log(req_url);

    return fetch(req_url, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }).then(response => response.json())
        .then(data => {
            console.log(data)
            return data
        })
}

export async function getTxnStatus(txnId) {
    var req_url = process.env.NEXT_PUBLIC_FIREBLOCKS_SERVER +"/get_txn/" + txnId;
    console.log(req_url);

    return fetch(req_url, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }).then(response => response.json())
        .then(data => {
            console.log(data)
            return data
        })
}

export async function getVaultTxns(asset, accountId) {
    var req_url = process.env.NEXT_PUBLIC_FIREBLOCKS_SERVER +"/get_vault_transactions";
    console.log(req_url);
    console.log(asset, accountId);
    return fetch(req_url, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            assets: asset,
            sourceId: accountId,
        })
    }).then(response => response.json())
        .then(data => {
            console.log(data)
            console.log("source type")
            console.log(data.source)
            return data
        })
}

export async function createWalletOnly(asset, accountId) {
    console.log("creating wallet only")
    const req_url = process.env.NEXT_PUBLIC_FIREBLOCKS_SERVER + "/create_wallet/" + accountId + "/" + asset;

    console.log("params: " + asset + " " + accountId)

    return fetch(req_url, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            id: accountId,
            asset: asset,
        })
    }).then(response => response)
        .then(data => {
            console.log(data)
            return data
        })
}

export function getDepositAddress(asset, accountId) {
    var req_url = process.env.NEXT_PUBLIC_FIREBLOCKS_SERVER +"/vault/accounts/" + accountId + "/" + asset + "/addresses";
    console.log(req_url);
   // console.log(asset, accountId);
    return fetch(req_url, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }).then(response => response.json())
        .then(data => {
          //  console.log(data)
            return data
        })
}

export async function getAllDepositAddresses(vaults) {

    let addresses = new Map

    return vaults.map(async (vault) => {
       // console.log(vault);

        for (let asset of vault.assets) {

            console.log("asset type" + asset)
            getDepositAddress(asset.id, vault.id)

                .then(response => {
                    addresses.set(vault.id + "|" + asset.id, response)
                })
        }

        console.log(addresses);
        return addresses;
    });

}

export function getSupportedAssets() {
    var req_url = process.env.NEXT_PUBLIC_FIREBLOCKS_SERVER +"/supported_assets";
    console.log(req_url);

    return fetch(req_url, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }).then(response => {
        console.log(response)
        return response.json()
    })
/*        .then(data => {
            console.log(data)
            return data
        })*/
}

