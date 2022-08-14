import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useForm } from "react-hook-form";
import {transferFunds} from "../../../util/fireblocks/fireblocks_functions";
import {FormControl, InputLabel, Select} from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";

export default function SendFunds({ walletId}, props) {

    console.log("Send Funds " + walletId);
    const [pending, setPending] = useState(false);

    const [amount, setAmount] = useState('');
    const [fee, setFee] = useState('');
    const [password, setPassword] = useState('');
    const [destAddress, setDestAddress] = useState('');
    const [coin, setCoin] = useState('BTC_TEST');
    const [selectedCoin, setSelectedCoin] = useState(1);

    const { handleSubmit, getValues, errors, sendFunds } = useForm();

    const selectionChangeHandler = (event) => {

        if(event.target.value === 1) {
            setSelectedCoin(1);
            setCoin('BTC_TEST');
        } else {
            setSelectedCoin(2);
            setCoin('ETH_TEST');
        }
    };

    const onSubmit = async (data) => {

        console.log("Sending " + coin + " to " + walletId)

        const txn =
            {
                asset: coin,
                source: walletId,
                dest: destAddress,
                amount: amount,
                fee: 0.001,
                note: 'sendings funds',
            };

        console.log(txn);

        console.log(transferFunds(txn))
        transferFunds(txn)
            .then(async res => {
                console.log(await res);
                setPending(false);
            }).catch(err => {
                console.log(err);
                setPending(false);
            })

        /*transferFunds(txn).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setPending(false);
        } );*/

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container={true} spacing={2}>

                <Grid item={true} xs={12}>
                    <TextField
                        variant="outlined"
                        type="text"
                        label="Destination Vault"
                        name="destAddress"
                        fullWidth={true}
                        onChange={(e) => setDestAddress(e.target.value)}
                    />
                </Grid>

                <Grid item={true} xs={12}>
                    <TextField
                        variant="outlined"
                        type="text"
                        label="Amount"
                        name="amount"
                        fullWidth={true}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </Grid>

                <Grid item={true} xs={12}>
                    <FormControl>
                        <InputLabel>Assets</InputLabel>
                        <Select value={selectedCoin} onChange={selectionChangeHandler}>
                            <MenuItem value={1}>BTC_TEST</MenuItem>
                            <MenuItem value={2}>ETH_TEST</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {/*                <Grid item={true} xs={12}>
                    <TextField
                        variant="outlined"
                        type="text"
                        label="Fee"
                        name="fee"
                        fullWidth={true}
                        onChange={(e) => setFee(e.target.value)}
                    />
                </Grid>*/}
                <Grid item={true} xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        disabled={pending}
                        fullWidth={true}
                    >
                        {!pending && <span>Send Funds</span>}

                        {pending && <CircularProgress size={28} />}
                    </Button>
                </Grid>
            </Grid>
        </form>
  );
}