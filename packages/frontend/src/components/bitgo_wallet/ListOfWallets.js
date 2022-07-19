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
import CoPresentIcon from '@mui/icons-material/CoPresent';
import ShareWallet from "./ShareWallet";
import {deleteWallet, getWallets} from "../../util/bitgo/bitgo_functions";

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

    const [openShareWallet, setOpenShareWallet] = useState(false);

    const [openDetails, setOpenDetails] = React.useState(false);
    const [coin, setCoin] = useState("teth");

    const handleCloseSendFunds = () => setOpenSendFunds(false);
    const handleCloseDetails = () => setOpenDetails(false);
    const handleCloseShareWallet = () => setOpenShareWallet(false);

    function handleOpenSendFunds(id)  {
        setWalletId(id)
        setOpenSendFunds(true);
    }

    function handleOpenShareWallet(id) {
        setWalletId(id)
        setOpenShareWallet(true)
    }

    const handleOpenViewHistory = (id) => {
        setWalletId(id)
        setOpenDetails(true);
    }

    function handleChange(event) {
        setCoin(event.target.value);
        console.log(coin)
    }

    useEffect(async () => {
        const listOfWallets = await getWallets(coin)
        console.log(listOfWallets);

        setWallets(listOfWallets);

    }, [coin])

    return (
        <div>
            <Card sx={{ maxWidth: 345 }} >

                <br></br>
                <Typography variant="h5" align="center">BitGo {coin.toUpperCase()} Wallets</Typography>

                <br></br>

                <br></br>

                {wallets.length > 0 &&
                <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Balance</TableCell>
                                <TableCell>Send Funds</TableCell>
                                <TableCell>History</TableCell>
                                <TableCell>Delete</TableCell>
                                <TableCell>Share</TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {wallets.map((item,index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.label}</TableCell>
                                    <TableCell>{item.balance}</TableCell>
                                    <TableCell>
                                        <Button variant="contained"
                                                startIcon={<SendIcon/>}
                                                onClick={() => {
                                                    handleOpenSendFunds(item.id)
                                                }}
                                        > Send
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button color='primary' variant="contained"
                                                startIcon={<ArticleIcon/>}
                                                onClick={() => {
                                                    handleOpenViewHistory(item.id)
                                                }}>
                                            History
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button color='primary' variant="contained" onClick={() => {
                                            deleteWallet(item.id, coin)
                                                .then(() => {
                                                    getWallets(coin)
                                                }).catch((error) => {
                                                console.log(error)
                                            })
                                        }} startIcon={<DeleteIcon/>}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button color='primary' variant="contained" onClick={() => {
                                            handleOpenShareWallet(item.id)
                                        }} startIcon={<CoPresentIcon/>}>
                                            Share
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                }
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
                open={openShareWallet}
                onClose={handleCloseShareWallet}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Use this form to share your wallet
                    </Typography>

                    <ShareWallet coin={coin} walletId={walletId}/>

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

                    <WalletDetails coin={coin} walletId={walletId}/>
                </Box>
            </Modal>
        </div>
    )
}
