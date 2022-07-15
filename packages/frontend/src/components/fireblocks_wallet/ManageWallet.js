import {useEffect, useState} from "react";
import {getVaultInfo, getVaultTxns} from "../../util/fireblocks/fireblocks_functions";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";


export default function ManageWallet({accountId}, props) {

    const [vaultInfo, setVaultInfo] = useState([]);
    const [vaultName, setVaultName] = useState(null);
    const [vaultId, setVaultId] = useState(null);
    const [customerId, setCustomerId] = useState(null);
    const [assets, setAssets] = useState([]);
    const [txnHistory, setTxnHistory] = useState([]);

    //Get all wallets in a vault
    useEffect(async () => {

        const vaultInfo = await getVaultInfo(accountId)
            .then(response => {
                console.log(response.name)
                setVaultInfo(response);
                setVaultName(response.name)
                setVaultId(response.id)
                setCustomerId(response.customerRefId)
                setAssets(response.assets)
            })

        //console.log(vaultInfo);

        setVaultInfo(await getVaultInfo(accountId));

    }, [accountId]);


    useEffect(async () => {
        await getVaultTxns('ETH_TEST', accountId)
            .then(r => {
                console.log(r)
                setTxnHistory(r)
            })

    }, [accountId]);

    //Add a delete button for each wallet

    //Add a button to add whitelisted addresses to a wallet
    function whilteListAddresses() {
        console.log("whilteListAddresses");
    }

    return(
        <Container>
            <Typography variant="h6">
                {vaultId} - {vaultName}
            </Typography>
            <Typography variant="body1">
                Customer ID: {customerId}
            </Typography>
            {assets.map(asset => {
                return(
                      <Table>
                          <TableRow>
                              <TableCell>Asset</TableCell>
                              <TableCell>Total</TableCell>
                              <TableCell>Balance</TableCell>
                          </TableRow>
                          <TableRow>
                                <TableCell>{asset.id}</TableCell>
                                <TableCell>{asset.total}</TableCell>
                                <TableCell>{asset.balance}</TableCell>
                          </TableRow>
                      </Table>
                 )
                }
                )}
        </Container>
    )
}