import Container from "@material-ui/core/Container";
import {Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";
import {getAllAddressesBalance, getTxnHistory} from "../../util/bitgo/bitgo_functions";

export default function WalletDetails({coin, walletId}, props) {
    const [data,setData]=useState([]);
    const entryList = [];

    useEffect(async () => {
        console.log(await getAllAddressesBalance(coin, walletId));

        //TODO: Fix this, it's too slow and a little funky
        await getAllAddressesBalance(coin, walletId)
            .then(res => {
                console.log(res.id);
                setData(res);
            })
            .catch(err => {
            console.log(err);
            })
    }, [coin, walletId])

    return(

        <div>
            {data && data.length > 0 &&
            <Container>

                <Typography>
                    Below are your past transactions for {walletId}
                </Typography>
                <Typography variant="h5">Transaction History</Typography>

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
                                    <TableRow index = {index}>
                                        <TableCell>{item.address}</TableCell>
                                        <TableCell>{item.balance.balance}</TableCell>
                                    </TableRow>

                                </TableBody>
                            )}
                    </Table>
                </TableContainer>

            </Container>
            }
        </div>

    )
}
