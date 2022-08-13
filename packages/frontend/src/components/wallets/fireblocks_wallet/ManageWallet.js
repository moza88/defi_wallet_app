import React, {useEffect, useState} from "react";
import {
    createWalletOnly, getDepositAddress,
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


export default function ManageWallet({accountId, depositAddress}, props) {

    const [vaultInfo, setVaultInfo] = useState([]);
    const [vaultName, setVaultName] = useState(null);
    const [vaultId, setVaultId] = useState(null);
    const [customerId, setCustomerId] = useState(null);
    const [assets, setAssets] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState([]);
    const [newAddress, setNewAddress] = useState(null);
    const [whiteWalletAddress, setWhiteWalletAddress] = useState(null);

    // const [depositAddress, setDepositAddress] = useState(new Map);

    const {handleSubmit, getValues, errors, sendFunds} = useForm();

    useEffect(() => {
        console.log(depositAddress.get(accountId));
    }, [depositAddress]);


    function getDepositAddress(id, asset) {

        console.log(depositAddress)
        console.log("Deposit Address: " + depositAddress.get(id  + "|" + asset).toString());
        console.log(depositAddress.get(id));

        for(const element of depositAddress.get(id  + "|" + asset)) {

            console.log(element.assetId);
            if (element.assetId === asset) {
                console.log(element.address)
                return element.address;
            }
        }
    }

    function createWallet() {
        console.log("Assets: ", selectedAsset);
        console.log("Account ID: ", accountId);
        //setNewAddress(createWalletOnly('BTC_TEST', accountId));

        createWalletOnly('ETH_TEST', accountId)
            .then(res => {
                console.log("Is the New Wallet Created: ", res.statusText);
            }).catch(err => {
            console.log("Error: ", err);
        });

        getAddressesForVault(accountId)

    }

    const onSubmit = (data) => {

        console.log("Sending funds to " + whiteWalletAddress)
    };


    async function getAddressesForVault(id) {
        return getVaultInfo(accountId)
            .then(response => {
                console.log(response.name)
                setVaultInfo(response);
                setVaultName(response.name)
                setVaultId(response.id)
                setCustomerId(response.customerRefId)
                setAssets(response.assets)
            })
            .catch(error => {
                    console.log(error)
                }
            )

       // console.log(vaultInfo);

      //  setVaultInfo(vaultInfo);
    }

    //Get all wallets in a vault
    useEffect(async () => {

        await getAddressesForVault(accountId);

    }, [accountId]);


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
                label="ETH_TEST"
            />
            <Button variant="contained" color='secondary'
                    onClick={createWallet}>
                Create Wallet
            </Button>

            {depositAddress && depositAddress.size > 0 &&
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Address</TableCell>
                        <TableCell>Asset</TableCell>
                        <TableCell>Balance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {assets && depositAddress && assets.map(asset => (
                        <TableRow>
                            <TableCell>{getDepositAddress(accountId, asset.id)}</TableCell>
                            <TableCell>{asset.id}</TableCell>
                            <TableCell>{asset.balance}</TableCell>
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
