import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useForm } from "react-hook-form";
import {getTxnStatus, transferFunds} from "../../../util/fireblocks/fireblocks_functions";
import {FormControl, InputLabel, Select, Table, TableCell, TableRow} from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import Container from "@material-ui/core/Container";

export default function SendFunds({ walletId}, props) {

    console.log("Send Funds " + walletId);
    const [pending, setPending] = useState(false);

    const [amount, setAmount] = useState('');
    const [fee, setFee] = useState('');
    const [networkFee, setNetworkFee] = useState('');
    const [password, setPassword] = useState('');
    const [destAddress, setDestAddress] = useState('');
    const [coin, setCoin] = useState('BTC_TEST');
    const [selectedCoin, setSelectedCoin] = useState(1);
    const [txnId, setTxnId] = useState('');
    const [amountUSD, setAmountUSD] = useState('');
    const [txHash, setTxHash] = useState('');
    const [txnStatus, setTxnStatus] = useState('');
    const [sourceAddress, setSourceAddress] = useState('');
    const [destinationAddress, setDestinationAddress] = useState('');
    const [asset, setAsset] = useState('');

    const {handleSubmit, getValues, errors, sendFunds} = useForm();

    const selectionChangeHandler = (event) => {

        if (event.target.value === 1) {
            setSelectedCoin(1);
            setCoin('BTC_TEST');
        } else {
            setSelectedCoin(2);
            setCoin('ETH_TEST');
        }
    };

    function txnStatusInfo(txn) {

        getTxnStatus(txn)
            .then(async result => {
                const txnStatus = await result;

                console.log(txnStatus.amountUSD);
                setAmountUSD(txnStatus.amountUSD);

                console.log(txnStatus.txHash);
                setTxHash(txnStatus.txHash);
                setTxnStatus(txnStatus.status);
                setSourceAddress(txnStatus.sourceAddress);
                setDestinationAddress(txnStatus.destinationAddress);
                setAsset(txnStatus.assetId);
                setFee(txnStatus.fee);
                setNetworkFee(txnStatus.networkFee);

            }).then(res => {
            console.log(res);
        })
            .catch(error => {
                console.log("Error " + error);
        }).finally(() => {
                setPending(false);
        });
    }

    const onSubmit = async () => {

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

        transferFunds(txn)
            .then(res => {
                console.log(res.id);

                txnStatusInfo(res.id);
                setTxnId(res.id);

            }).catch(err => {
            console.log(err);
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {txnId === '' &&

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
                            <br/>
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
}
            {txnId &&
                <Container>
                    <h1>Transaction Status</h1>
                    <Table>
                        <TableRow>
                            <TableCell>Transaction ID</TableCell>
                            <TableCell>TXN Status</TableCell>
{/*                            <TableCell>Source Address</TableCell>
                            <TableCell>Destination Address</TableCell>*/}
                            <TableCell>Amount in {asset}</TableCell>
{/*
                            <TableCell>Fee</TableCell>
*/}
{/*
                            <TableCell>Network Fee</TableCell>
*/}
                            <TableCell>Amount in USD</TableCell>
                            <TableCell>Transaction Hash</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{txnId}</TableCell>
                            <TableCell>{txnStatus}</TableCell>
{/*                            <TableCell>{sourceAddress}</TableCell>
                            <TableCell>{destinationAddress}</TableCell>*/}
                            <TableCell>{amount}</TableCell>
{/*
                            <TableCell>{fee}</TableCell>
*/}
{/*
                            <TableCell>{networkFee}</TableCell>
*/}
                            <TableCell>{amountUSD}</TableCell>
                            <TableCell>{txHash}</TableCell>
                        </TableRow>
                    </Table>
                </Container>

            }
        </form>
  );
}