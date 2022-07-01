import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useForm } from "react-hook-form";
import {useRouter} from "next/router";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {Card, CardHeader, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";

export default function CreateWallet(props) {
    const [pending, setPending] = useState(false);

    const [vaultName, setVaultName] = React.useState('');

    const {handleSubmit, getValues, errors, sendFunds} = useForm();

    const [asset, setAsset] = useState("ETH_TEST");

    const [newWalletId, setNewWalletId] = useState('')
    const [newReceiverAddress, setRecieverAddress] = useState('')

    function handleChange(event) {
        setAsset(event.target.value);
        console.log(asset)
    }

    const createWallet = (vaultName, asset) => {
        console.log(vaultName, asset);

        fetch(process.env.NEXT_PUBLIC_FIREBLOCKS_SERVER + '/create_vault_wallet/', {
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

                setNewWalletId(walletInfo.id)
                setRecieverAddress(walletInfo.address)
            });
    }

    function refreshPage() {
        window.location.reload(false);
    }

    const onSubmit = () => {
        console.log(vaultName)
        console.log(asset)
        createWallet(vaultName, asset);
        //refreshPage();
    };

    return (

        <Container>
            <Typography variant="h6">Create Wallet</Typography>

            {!newWalletId &&
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container={true} spacing={2}>
                    <Grid item={true} xs={12}>
                        <TextField
                            variant="outlined"
                            type="text"
                            label="Vault Name"
                            name="vaultName"
                            placeholder="My Wallet"
                            fullWidth={true}
                            onChange={(e) => setVaultName(e.target.value)}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <TextField
                            variant="outlined"
                            type="text"
                            label="Asset"
                            name="asset"
                            placeholder="ETH_TEST"
                            fullWidth={true}
                            onChange={(e) => setAsset(e.target.value)}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                            disabled={pending}
                            fullWidth={true}
                        >
                            {!pending && <span>Create New Wallet</span>}

                            {pending && <CircularProgress size={28}/>}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            }
            {newWalletId &&
            <Card >
                <CardHeader title ="New Wallet Details"/>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Wallet ID</TableCell>
                                <TableCell>Receiver Address</TableCell>
                                <TableCell>Backup</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{newWalletId}</TableCell>
                                <TableCell>{newReceiverAddress}</TableCell>
                                <TableCell>Backup</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Typography>Add Bitcoins to your wallet</Typography>
                    <a>https://testnet.help/en/btcfaucet/testnet#log</a>
                </CardContent>
            </Card>
            }

        </Container>
    );
}