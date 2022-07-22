import Container from "@material-ui/core/Container";
import {Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";
import {
    getAddressBalance,
    getAddresses,
    getAllAddressesBalance,
    getTxnHistory
} from "../../../util/bitgo/bitgo_functions";

export default function WalletDetails({coin, walletId, data}, props) {
    //const [data, setData]=useState([]);
    const [addresses, setAddresses] = useState([]);

    const entryList = [];

    useEffect(async () => {
        console.log(data.address);

    })

/*    useEffect(async () => {
        /!*data.map((item) => {
             getAddressBalance(coin, walletId, item.address)
                .then(res => {
                    setData(res);
                }).catch(err => {
                    console.log(err);
                }
            )
        })*!/

        console.log("print addresses")
        console.log(addresses);
        const address = addresses[0].address

        getAddressBalance(coin, walletId, address)
            .then(res => {
                console.log(res)
                setData(res);
            }).catch(err => {
                console.log(err);
            }
        )
    }, [addresses])*/

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
                                    <TableRow key={index}>
                                        <TableCell>{item.address}</TableCell>
                                        <TableCell>{item.balance}</TableCell>
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
