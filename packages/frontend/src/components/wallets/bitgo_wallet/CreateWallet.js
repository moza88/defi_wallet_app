import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import {
    Grid,
    TableRow,
    Table, FormControl, InputLabel, Select,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useForm } from "react-hook-form";
import Typography from "@material-ui/core/Typography";
import {Card, CardHeader, TableBody, TableCell, TableHead} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import {createWallet} from "../../../util/bitgo/bitgo_functions";
import MenuItem from "@mui/material/MenuItem";

export default function CreateWallet(props) {
    const [pending, setPending] = useState(false);

    const [label, setLabel] = React.useState('');
    const [passphrase, setPassphrase] = React.useState('');

    const {handleSubmit, getValues, errors, sendFunds} = useForm();

    const [newWalletId, setNewWalletId] = useState('')
    const [newReceiverAddress, setRecieverAddress] = useState('')


    const [coin, setCoin] = useState("tbtc");

    const [selectedCoin, setSelectedCoin] = useState(1);

    const selectionChangeHandler = (event) => {

        if (event.target.value === 1) {
            setSelectedCoin(1);
            setCoin('tbtc');
        } else {
            setSelectedCoin(2);
            setCoin('gteth');
        }
    };

    function handleChange(event) {
        setCoin(event.target.value);
        console.log(coin)
    }

    function refreshPage() {
        window.location.reload(false);
    }

    const onSubmit = () => {

        const walletInfo = createWallet(label, passphrase, coin);

        console.log(walletInfo.then(res => {
            console.log(res)
            setNewWalletId(res.walletId)
            setRecieverAddress(res.receiveAddress)
            setPending(false)
        }))
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
                            label="Customer Name"
                            name="label"
                            placeholder="Bob Smith"
                            fullWidth={true}
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <TextField
                            variant="outlined"
                            type="text"
                            label="Passphrase"
                            name="passphrase"
                            placeholder="something something"
                            fullWidth={true}
                            onChange={(e) => setPassphrase(e.target.value)}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <FormControl>
                            <InputLabel>Assets</InputLabel>
                            <Select value={selectedCoin} onChange={selectionChangeHandler}>
                                <MenuItem value={1}>tbtc</MenuItem>
                                <MenuItem value={2}>gteth</MenuItem>
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
                </CardContent>
                </Card>
            }

        </Container>
  );
}