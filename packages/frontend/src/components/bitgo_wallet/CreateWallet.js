import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useForm } from "react-hook-form";
import {useRouter} from "next/router";

export default function CreateWallet(props) {
    const [pending, setPending] = useState(false);

    const [label, setLabel] = React.useState('');
    const [passphrase, setPassphrase] = React.useState('');

    const {handleSubmit, getValues, errors, sendFunds} = useForm();

    const [coin, setCoin] = useState("tbtc");

    function handleChange(event) {
        setCoin(event.target.value);
        console.log(coin)
    }

    const createWallet = (label, passphrase) => {
        console.log(label, passphrase);

        fetch(process.env.NEXT_PUBLIC_BITGO_SERVER + '/create_wallet/' + "coin=" + coin, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                label: label,
                passphrase: passphrase
            })
        })

    }

    function refreshPage() {
        window.location.reload(false);
    }

    const onSubmit = () => {

        createWallet(label, passphrase);
        refreshPage();
    };

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <br></br>

            <br></br><br></br>
            <Grid container={true} spacing={2}>
                <Grid item={true} xs={12}>
                    <TextField
                        variant="outlined"
                        type="text"
                        label="Label"
                        name="label"
                        placeholder="My Wallet"
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
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        disabled={pending}
                        fullWidth={true}
                    >
                        {!pending && <span>Create New Wallet</span>}

                        {pending && <CircularProgress size={28} />}
                    </Button>
                </Grid>
            </Grid>
        </form>
  );
}