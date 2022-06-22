import Container from "@material-ui/core/Container";
import {Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";

export default function WalletDetails({coin, walletId}, props) {
    const [data,setData]=useState([]);
    const entryList = [];

    console.log("wallet id passed" + walletId)

    const getTxnHistory = (coin, walletId) => {
        var req_url = process.env.NEXT_PUBLIC_BITGO_SERVER + "/txn_history" + "/coin=" + coin + "/walletId=" + walletId;
        console.log(req_url);

        fetch(req_url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(function(response){
                console.log(response)
                return response.json();
            })
            .then(function(myJson) {
                setData(myJson.transfers)

                console.log(data);
                data.forEach((entry) => {
                    entryList.push(entry.address)
                })

            }).then(console.log(entryList))
    }

    useEffect(() => {
        getTxnHistory(coin, walletId)
    }, [])

    return(
        <div>
            <div className="App">
                {
                    data && data.length>0 && data.map((item)=><p>{item.about}</p>)
                }
            </div>

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
                                data && data.length>0 && data.map((item)=>
                                    <TableRow>
                                        <TableCell>{item.date}</TableCell>
                                        <TableCell>{item.value}</TableCell>
                                    </TableRow>
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Container>
        </div>
    )
}
