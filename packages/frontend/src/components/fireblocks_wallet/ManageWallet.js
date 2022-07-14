import {useEffect, useState} from "react";
import {getVaultInfo} from "../../util/fireblocks/fireblocks_functions";


export default function ManageWallet({accountId}, props) {

    const [vaultInfo, setVaultInfo] = useState(null);

    //Get all wallets in a vault
    useEffect(async () => {

        console.log(await getVaultInfo(accountId))

        setVaultInfo(await getVaultInfo(accountId));

    }, [accountId]);


    //Add a delete button for each wallet

    //Add a button to add whitelisted addresses to a wallet
    function whilteListAddresses() {
        console.log("whilteListAddresses");
    }

    return(
        <div>

        </div>
    )
}