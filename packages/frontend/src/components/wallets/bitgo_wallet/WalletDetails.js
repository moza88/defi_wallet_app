import Container from "@material-ui/core/Container";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";

export default function WalletDetails({coin, walletId, data}, props) {
    const [addresses, setAddresses] = useState([]);

    function filteredAddresses(listAddresses, id) {
        let addressList = []
        for(const element of listAddresses) {
            if (element.id === id) {
                console.log(element)
                addressList = [...addressList, element]
                //addressList.push(element);
            }
        }
        console.log("Printing all addresses for " + id);
        console.log(addressList);

        addressList.sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance));
        // console.log(addresses)

        return addressList;
    }

    useEffect(async () => {

        setAddresses(filteredAddresses(data, walletId));

    }, [data, walletId]);


    return(

        <div>
            {addresses && addresses.length > 0 && (
                <Container maxWidth="lg">
                    <Typography>
                        Below are all the addresses for {walletId}
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Address</TableCell>
                                    <TableCell align="right">Balance</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {addresses.map((address) => (
                                    <TableRow key={address.address}>
                                        <TableCell component="th" scope="row">
                                            {address.address}
                                        </TableCell>
                                        <TableCell align="right">{address.balance}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            )}
        </div>

    )
}
