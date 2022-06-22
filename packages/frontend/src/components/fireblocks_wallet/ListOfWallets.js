import React, { useState, useEffect } from "react";
import {
    Card,
    TableContainer,
    TableRow,
    TableCell,
    TableBody,
    Table,
    TableHead,
    Paper,
    FormControl, InputLabel, Select,
    Typography
} from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Modal from '@material-ui/core/Modal';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import WalletDetails from "./WalletDetails";
import SendFunds from "./SendFunds";
import SendIcon from '@mui/icons-material/Send';
import ArticleIcon from '@mui/icons-material/Article';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ListOfWallets(props) {
    const [wallets, setWallets] = useState([]);
    const [walletId, setWalletId] = useState('');
    const [openSendFunds, setOpenSendFunds] = React.useState(false);
    const [openDetails, setOpenDetails] = React.useState(false);
    const [coin, setCoin] = useState("tbtc");

    const handleCloseSendFunds = () => setOpenSendFunds(false);
    const handleCloseDetails = () => setOpenDetails(false);

    const [values, setValues] = useState([
        "tbtc",
        "teth"
    ]);

    function handleOpenSendFunds(id)  {
        setWalletId(id)
        setOpenSendFunds(true);
    }

    const handleOpenViewHistory = (id) => {
        setWalletId(id)
        setOpenDetails(true);
    }

    function handleChange(event) {
        setCoin(event.target.value);
        console.log(coin)
    }

    function refreshPage() {
        window.location.reload(false);
    }

    const deleteWallet = (walletId) => {

        console.log("deleting wallet " + walletId)

        var req_url = process.env.NEXT_PUBLIC_BITGO_SERVER + "/delete_wallet/" +
            "coin=" +coin + "/" + "walletId=" + walletId


        fetch(req_url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                refreshPage();
            })

    }

    function getWallets(coin) {
        var req_url = process.env.NEXT_PUBLIC_BITGO_SERVER +"/wallet_list" + "/coin=" + coin;
        console.log(req_url);

        fetch(req_url)
            .then(response => {
                return response.json()
            })
            .then(data => {

                setWallets(data.wallets)
            })

        console.log(Array.isArray(wallets));
        console.log(wallets)
    }

    useEffect(() => {
        getWallets(coin)

    }, [])

    return (
        <div>
            <Card sx={{ maxWidth: 345 }} >

                <br></br>
                <Typography variant="h5" align="center">BitGo {coin.toUpperCase()} Wallets</Typography>

                <br></br>

                <Container>
                <FormControl>
                    <InputLabel htmlFor="coin">Coin</InputLabel>
                    <Select
                        value={coin}
                        onChange={handleChange}
                        inputProps={{
                            name: "coin",
                            id: "coin-simple",
                        }}
                    >
                        {values.map((value, index) => {
                            return <MenuItem value={value}>{value}</MenuItem>;
                        })}
                    </Select>
                </FormControl>
                </Container>

                <br></br>

                <TableContainer component={Paper}>
                    <Table stickyHeader  aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date Created</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Balance</TableCell>
                                <TableCell>Send Funds</TableCell>
                                <TableCell>History</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {wallets.map((item) => (
                                <TableRow>
                                    <TableCell>{item.startDate}</TableCell>
                                    <TableCell>{item.label}</TableCell>
                                    <TableCell>{item.balance}</TableCell>
                                    <TableCell>
                                        <Button variant="contained"
                                            startIcon={<SendIcon />}
                                                onClick={() => {
                                                    handleOpenSendFunds(item.id)
                                                }}
                                            > Send
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained"
                                                startIcon={<ArticleIcon />}
                                                onClick={() => {
                                                    handleOpenViewHistory(item.id)
                                                }}>
                                            History
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" onClick={() => {
                                            deleteWallet(item.id)
                                        }} startIcon={<DeleteIcon />}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Modal
                open={openSendFunds}
                onClose={handleCloseSendFunds}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Use this form to send your crypto.
                    </Typography>

                    <SendFunds coin={coin} walletId={walletId}/>

                </Box>
            </Modal>

            <Modal
                open={openDetails}
                onClose={handleCloseDetails}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Below are your past transactions for {walletId}
                    </Typography>
                    <WalletDetails coin={coin} walletId={walletId}/>
                </Box>
            </Modal>
        </div>
    )
}
