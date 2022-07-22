import React, {useEffect, useState} from "react";
import {
    createWalletOnly,
    getDepositAddress,
    getVaultInfo,
    getVaultTxns,
    transferFunds
} from "../../../util/fireblocks/fireblocks_functions";
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
    const [selectedAsset, setSelectedAsset] = useState([]);
    const [newAddress, setNewAddress] = useState(null);
    const [whiteWalletAddress, setWhiteWalletAddress] = useState(null);

    const [depositAddress, setDepositAddress] = useState(new Map);

    const { handleSubmit, getValues, errors, sendFunds } = useForm();

    function createWallet() {
        console.log("Assets: ", selectedAsset);
        console.log("Account ID: ", accountId);
        //setNewAddress(createWalletOnly('BTC_TEST', accountId));

        console.log(createWalletOnly('BTC_TEST', accountId));
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

        let addresses = new Map
        assets.map(async (asset) => {
            await getDepositAddress(asset.id, accountId)
                .then(response => {
                    //console.log(response)
                    //console.log(response[0].address)
                    const address = response[0].address;
                    addresses.set(asset.id, response[0].address)
                })
        })

        console.log("Getting address: " + addresses.get('BTC_TEST'))

        setDepositAddress(addresses);

    }, [assets]);


    //Add a delete button for each wallet

    //Add a button to add whitelisted addresses to a wallet
    function whilteListAddresses() {
        console.log("whilteListAddresses");
    }

    const handleChange = (event) => {
        setSelectedAsset('BTC_TEST');
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

            {depositAddress && depositAddress.size > 0 &&
            <Table>
                <TableHead>
                    <TableRow>
                        {/*
                        <TableCell>Address</TableCell>
*/}
                        <TableCell>Asset</TableCell>
                        <TableCell>Balance</TableCell>
                        <TableCell>Frozen</TableCell>
                        <TableCell>Deposit Address</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {assets && depositAddress && assets.map(asset => (
                        <TableRow>
                            {/*
                            <TableCell>{getDepositAddress(asset.id, accountId)}</TableCell>
*/}
                            <TableCell>{asset.id}</TableCell>
                            <TableCell>{asset.total}</TableCell>
                            <TableCell>{asset.frozen}</TableCell>
                            <TableCell>{depositAddress.get(asset.id)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
            }
            {newAddress && <Typography variant="body1">
                New Address: {newAddress}
            </Typography>}
        </Container>
    )

}
