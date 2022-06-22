
export default function createWallet(label, passphrase, coin, props) {

    console.log("creating wallet")
    console.log(label, passphrase);

    fetch(process.env.NEXT_PUBLIC_FIREBLOCKS_SERVER + '/create_wallet/' + "coin=" + coin, {
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
    }).then((response) => {
        console.log(response);

    }).catch((error) => {
        console.log(error)
    })

}
