import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useForm } from "react-hook-form";
import {transferFunds} from "../../../util/fireblocks/fireblocks_functions";

export default function SendFunds({coin, walletId}, props) {

    console.log("Send Funds " + walletId);
    const [pending, setPending] = useState(false);

    const [amount, setAmount] = useState('');
    const [fee, setFee] = useState('');
    const [password, setPassword] = useState('');
    const [destAddress, setDestAddress] = useState('');

    const { handleSubmit, getValues, errors, sendFunds } = useForm();

    const onSubmit = (data) => {

        console.log("Sending funds to " + walletId)

        const txn =
            {
                asset: coin,
                source: walletId,
                dest: destAddress,
                amount: amount,
                fee: fee,
                note: 'sendings funds',
            };

        transferFunds(txn).then(r => {
            console.log(r)
        })
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
                    <TextField
                        variant="outlined"
                        type="text"
                        label="Fee"
                        name="fee"
                        fullWidth={true}
                        onChange={(e) => setFee(e.target.value)}
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
                        {!pending && <span>Send Funds</span>}

                        {pending && <CircularProgress size={28} />}
                    </Button>
                </Grid>
            </Grid>
        </form>
  );
}