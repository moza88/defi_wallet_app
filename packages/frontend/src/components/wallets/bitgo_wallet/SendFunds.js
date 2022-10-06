import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useForm } from "react-hook-form";
import {transferFunds} from "../../../util/bitgo/bitgo_functions";
import Link from "next/link";

export default function SendFunds({coin, walletId}, props) {

    console.log("Send Funds " + walletId);
    const [pending, setPending] = useState(false);

    const [amount, setAmount] = useState('');
    const [password, setPassword] = useState('');
    const [destAddress, setDestAddress] = useState('');
    const [txnId, setTxnId] = useState('');
    const [txnStatus, setTxnStatus] = useState('');
    const [explorerURL, setExplorerURL] = useState('');
    const { handleSubmit, getValues, errors, sendFunds } = useForm();


    const onSubmit = (data) => {

        console.log("Sending funds to " + walletId)

        const txn =
            {
                coin: coin,
                walletId: walletId,
                amount: amount,
                destAddress: destAddress,
                password: "something"
            };

        const transfer = transferFunds(txn);
        console.log(transfer)
        transfer
            .then(res => res)
            .then(res => {
                console.log(res.txid)
                setTxnStatus(res.status)
                setTxnId(res.txid);
                setExplorerURL("https://blockstream.info/testnet/tx/" + res.txid)
                setPending(false);
            }).catch(err => {
                console.log(err);
                setPending(false);
            })
    };

    return (
        <div>
            {!txnId &&

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container={true} spacing={2}>

                    <Grid item={true} xs={12}>
                        <TextField
                            variant="outlined"
                            type="text"
                            label="Destination Address"
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

{/*                    <Grid item={true} xs={12}>
                        <TextField
                            variant="outlined"
                            type="password"
                            label="Password"
                            name="password"
                            placeholder="something something"
                            fullWidth={true}
                            onChange={(e) => setPassword(e.target.value)}
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

                            {pending && <CircularProgress size={28}/>}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            }
    {txnId &&
        <div>
            <h3>Transaction ID for {coin} txn: </h3>
            <p>{txnId}</p>

            <a href={explorerURL} target="_blank" rel="noopener noreferrer">
                <a>View on Blockstream</a>
            </a>
            <p></p>
        </div>
    }
        </div>
  );
}