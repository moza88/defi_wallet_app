import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useForm } from "react-hook-form";
import {useRouter} from "next/router";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {
    Card,
    CardHeader,
    FormControl,
    InputLabel, Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import {createWallet} from "../../../util/fireblocks/fireblocks_functions";
import MenuItem from "@mui/material/MenuItem";

export default function CreateWallet({supportedAssets}, props) {
    const [pending, setPending] = useState(false);

    const [vaultName, setVaultName] = React.useState('');

    const {handleSubmit, getValues, errors, sendFunds} = useForm();

    const [newWalletId, setNewWalletId] = useState('')
    const [newReceiverAddress, setRecieverAddress] = useState('')

    const [walletInfo, setWalletInfo] = useState(null);

    const [coin, setCoin] = useState("BTC_TEST");

    const [selectedCoin, setSelectedCoin] = useState("BTC_TEST");

    const selectionChangeHandler = (event) => {

        console.log(event.target.value);
        setCoin(event.target.value);
        setSelectedCoin(event.target.value);
    };

    const onSubmit = () => {
        console.log(vaultName)

        setWalletInfo(createWallet(vaultName, coin).then(
            (wallet) => {
                console.log(wallet)

                setNewWalletId(wallet.id)
                setRecieverAddress(wallet.address)
            }
        ))

        console.log(walletInfo)

    };

    return (

        <Container>
            <Typography variant="h6">Create Vault</Typography>

            {!newWalletId &&
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container={true} spacing={2}>
                    <Grid item={true} xs={12}>
                        <Typography>
                            Be sure to include WIM in front of your vault name so it show up in the filtered list.
                        </Typography>
                        <TextField
                            variant="outlined"
                            type="text"
                            label="Vault Name"
                            name="vaultName"
                            placeholder="WIM Family Trust"
                            fullWidth={true}
                            onChange={(e) => setVaultName(e.target.value)}
                        />
                    </Grid>
{/*                    <Grid item={true} xs={12}>
                        <TextField
                            variant="outlined"
                            type="text"
                            label="Asset"
                            name="asset"
                            placeholder="ETH_TEST"
                            fullWidth={true}
                            onChange={(e) => setAsset(e.target.value)}
                        />
                    </Grid>*/}

                    <Grid item={true} xs={12}>
                        <FormControl>
                            <InputLabel>Assets</InputLabel>
                            <Select value={selectedCoin} onChange={selectionChangeHandler}>
                                {supportedAssets.map((asset, index) =>

                                    <MenuItem value={asset.id}>{asset.id}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
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
                            {!pending && <span>Create New Vault</span>}

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
                    <Typography>
                        Your new vault has been created with a wallet to support {coin} assets.
                    </Typography>
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
                </CardContent>
            </Card>
            }

        </Container>
    );
}