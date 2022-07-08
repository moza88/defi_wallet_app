import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useForm } from "react-hook-form";
import { shareWallet} from "../../util/bitgo/bitgo_functions";

export default function ShareWallet({coin, walletId}, props) {

    console.log("Share Wallet " + walletId);
    const [pending, setPending] = useState(false);

    const [email, setEmail] = useState('');
    const [permissions, setPermissions] = useState('');
    const [passphrase, setPassphrase] = useState('');

    const { handleSubmit, getValues, errors, sendFunds } = useForm();


    const onSubmit = (data) => {

        console.log("Sending funds to " + walletId)

        const walletShare =
            {
                coin: coin,
                walletId: walletId,
                email: email,
                passphrase: passphrase,
                perms: permissions
            };

        shareWallet(walletShare);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container={true} spacing={2}>

                <Grid item={true} xs={12}>
                    <TextField
                        variant="outlined"
                        type="email"
                        label="Email"
                        name="email"
                        fullWidth={true}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>

                <Grid item={true} xs={12}>
                    <TextField
                        variant="outlined"
                        type="password"
                        label="Passphrase"
                        name="passphrase"
                        fullWidth={true}
                        onChange={(e) => setPassphrase(e.target.value)}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <TextField
                        variant="outlined"
                        type="text"
                        label="Permissions"
                        name="permissions"
                        fullWidth={true}
                        onChange={(e) => setPermissions(e.target.value)}
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
                        {!pending && <span>Share Wallet</span>}

                        {pending && <CircularProgress size={28} />}
                    </Button>
                </Grid>
            </Grid>
        </form>
  );
}