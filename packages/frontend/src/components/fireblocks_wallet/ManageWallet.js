import React, {useEffect, useState} from "react";
import {createWalletOnly, getVaultInfo, getVaultTxns, transferFunds} from "../../util/fireblocks/fireblocks_functions";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";


export default function ManageWallet({accountId}, props) {

    const [vaultInfo, setVaultInfo] = useState([]);
    const [vaultName, setVaultName] = useState(null);
    const [vaultId, setVaultId] = useState(null);
    const [customerId, setCustomerId] = useState(null);
    const [assets, setAssets] = useState([]);
    const [txnHistory, setTxnHistory] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState([]);

    const [whiteWalletAddress, setWhiteWalletAddress] = useState(null);

    const { handleSubmit, getValues, errors, sendFunds } = useForm();

    function createWallet() {
        console.log("Assets: ", selectedAsset);
        console.log("Account ID: ", accountId);
        createWalletOnly(selectedAsset, accountId);
    }

    const onSubmit = (data) => {

        console.log("Sending funds to " + whiteWalletAddress)
    };

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

    const handleChange = (event) => {
        setSelectedAsset(event.target.checked);
    };

    return(
        <Container>
            <Typography variant="h6">
                {vaultId} - {vaultName}
            </Typography>
            <Typography variant="body1">
                Customer ID: {customerId}
            </Typography>

            <FormControlLabel
                control={<Checkbox checked={selectedAsset} onChange={handleChange} />}
                label="BTC_TEST"
            />
            <Button variant="contained" color='secondary'
                    onClick={createWallet}>
                Create Wallet
            </Button>

{/*            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container={true} spacing={2}>

                    <Grid item={true} xs={12}>
                        <TextField
                            variant="outlined"
                            type="text"
                            label="White Wallet Address"
                            name="whiteWalletAddress"
                            fullWidth={true}
                            onChange={(e) => setWhiteWalletAddress(e.target.value)}
                        />
                    </Grid>

                    <Button variant="contained" color='secondary' type="submit">
                        Add Whitelisted Addresses
                    </Button>
                </Grid>
            </form>*/}

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