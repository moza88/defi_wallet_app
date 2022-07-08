import Container from "@material-ui/core/Container";
import {Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";
import {getTxnHistory} from "../../util/bitgo/bitgo_functions";

export default function WalletDetails({coin, walletId}, props) {
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

            <div className="App">
                {
                    data && data.length>0 && data.map((item)=><p>{item.about}</p>)
                }
            </div>

            {
                data && data.length>0 && data.map((item)=>
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

                                    <TableRow>
                                        <TableCell>{item.date}</TableCell>
                                        <TableCell>{item.value}</TableCell>
                                    </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>

            </Container>
                )}
        </div>

    )
}
