import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useForm } from "react-hook-form";

export default function SendFunds({coin, walletId}, props) {
    const [pending, setPending] = useState(false);

    const [amount, setAmount] = useState('');
    const [password, setPassword] = useState('');
    const [destAddress, setDestAddress] = useState('');

    const { handleSubmit, getValues, errors, sendFunds } = useForm();


    const onSubmit = (data) => {

        transferFunds(coin, walletId, amount, destAddress, password);
    };

    function transferFunds(coin, walletId, destAddress, amount, password) {
        var req_url = process.env.NEXT_PUBLIC_BITGO_SERVER +"/send_txn";
        console.log(req_url);

        fetch(req_url, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                coin: coin,
                walletId: walletId,
                amount: amount,
                destAddress: destAddress,
                password: password,
            })
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container={true} spacing={2}>

                <Grid item={true} xs={12}>
                    <TextField
                        variant="outlined"
                        type="text"
                        label="Destiantion Address"
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
                        type="password"
                        label="Password"
                        name="password"
                        placeholder="something something"
                        fullWidth={true}
                        onChange={(e) => setPassword(e.target.value)}
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