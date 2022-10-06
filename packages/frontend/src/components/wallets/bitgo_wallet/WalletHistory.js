import Container from "@material-ui/core/Container";
import {Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";
import {getTxnHistory} from "../../../util/bitgo/bitgo_functions";

export default function WalletHistory({coin, walletId}, props) {
    const [data,setData]=useState([]);
    const entryList = [];

    useEffect(() => {
        getTxnHistory(coin, walletId)
            .then(function(myJson) {
                setData(myJson.transfers)

                console.log(data);
                data.forEach((entry) => {
                    entryList.push(entry.address)
                })
                    return entryList;
            })
    }, [coin, walletId])

    return(

        <div>

            {data && data.length > 0 ? (
            <Container>

                <Typography variant="h6">Transaction History for Wallet {walletId}</Typography>

                <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        {
                            data.map((item, index) =>

                                <TableBody>
                                    <TableRow>
                                        <TableCell>{item.date}</TableCell>
                                        <TableCell>{item.value}</TableCell>
                                    </TableRow>

                                </TableBody>
                            )}
                    </Table>
                </TableContainer>

            </Container>
            ) : <div>No Transaction History Yet...</div>
            }

        </div>

    )
}
