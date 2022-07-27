import Container from "@material-ui/core/Container";
import {Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";
import {getVaultTxns} from "../../../util/fireblocks/fireblocks_functions";
import { format } from 'date-fns'

export default function WalletDetails({coin, walletId}, props) {
    const [data,setData]=useState([]);
    const entryList = [];

    const [txnHistory, setTxnHistory] = useState([]);

    console.log("wallet id passed" + walletId)
    const [wallets, setWallets] = useState([]);

    let entry = ''
    const [transferHistory, setTransferHistory] = useState([])

    useEffect(async () => {
        const vaultTxns = await getVaultTxns('ETH_TEST', walletId)
            .then(r => {
                console.log(r)
                setTxnHistory(r)
            })

        console.log(await getVaultTxns('ETH_TEST', walletId))

    }, [walletId]);

    return(
        <div>

            <Container>
                <Typography variant="h5">Transaction History</Typography>

                <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                txnHistory && txnHistory.length>0 && txnHistory.map((item)=>
                                    <TableRow>
                                        <TableCell>{format(item.lastUpdated, 'dd/mm/yyyy')}</TableCell>
                                        <TableCell>{item.amount}</TableCell>
                                    </TableRow>
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Container>
        </div>
    )
}
