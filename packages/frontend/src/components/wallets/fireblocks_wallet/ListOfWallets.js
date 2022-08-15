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
import {
    getAllBalances, getAllDepositAddresses,
    getBalance,
    getDepositAddress,
    getWallets,
    test
} from "../../../util/fireblocks/fireblocks_functions";
import ManageWallet from "./ManageWallet";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

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

const sm_modal_style = {
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

const lg_modal_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ListOfWallets(props) {
    //const [wallets, setWallets] = useState([]);
    const [wallets, setWallets] = useState([]);
    const [walletId, setWalletId] = useState('');
    const [openSendFunds, setOpenSendFunds] = React.useState(false);
    const [balances, setBalances] = useState(new Map());
    const [balance, setBalance] = useState(0);
    const [addresses, setAddresses] = useState(new Map());

    const [openShareWallet, setOpenShareWallet] = useState(false);

    const [openDetails, setOpenDetails] = React.useState(false);
    const [openManage, setOpenManage] = React.useState(false);

    const [coin, setCoin] = useState("ETH_TEST");

    const handleCloseSendFunds = () => setOpenSendFunds(false);
    const handleCloseDetails = () => setOpenDetails(false);
    const handleCloseShareWallet = () => setOpenShareWallet(false);
    const handleCloseManage = () => setOpenManage(false);

    const [values, setValues] = useState([
        "BTC_TEST",
        "ETH_TEST"
    ]);

    function handleOpenSendFunds(id)  {
        setWalletId(id)
        setOpenSendFunds(true);
    }

    const handleOpenViewHistory = (id) => {
        setWalletId(id)
        setOpenDetails(true);
    }

    const handleOpenManage = (id) => {
        setWalletId(id)
        setOpenManage(true);
    }

    function handleChange(event) {
        setCoin(event.target.value);
        console.log(coin)
    }

    function refreshPage() {
        window.location.reload(false);
    }

    /**
     * Get all Wallets for the table
     */
    useEffect(async () => {

        const wallets = await getWallets(coin);

        console.log(wallets[0].name)

        let listOfWallets = [];
        for(const wallet of wallets) {
            listOfWallets = [...listOfWallets, wallet]
        }
        console.log(listOfWallets)
        setWallets(listOfWallets)

        console.log(wallets)
    }, [coin])

    /**
     * Get the balances of all wallets
     */
    useEffect(() => {
        getAllBalances(coin, wallets)
            .then(data => {
                console.log(data)
                setBalances(data)
               // setBalances(balances => [...balances, data])
            })
            .catch((error)=> {
            //console.log(error)
        })

    }, [wallets])

    useEffect(  async () => {
        let mapAddresses = new Map();
        await getAllDepositAddresses(wallets).then(
            async data => {
                //console.log(await data[0])
                mapAddresses = await data[0]
                setAddresses(await data[0])
            }
        )
        console.log(mapAddresses)
        setAddresses(mapAddresses)
    }, [wallets]);

    return (
        <div>
            <Card sx={{ maxWidth: 345 }} >

                <br></br>
                <Typography variant="h5" align="center">WIM Customer Vaults on Fireblocks</Typography>
                <br></br>

                <br></br>
                {wallets.length && balances.size > 0 &&
                <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Name</TableCell>
{/*
                                <TableCell>Balance</TableCell>
*/}
                                <TableCell>Send Funds</TableCell>
{/*
                                <TableCell>History</TableCell>
*/}
                                <TableCell>Manage</TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>

                            {wallets.map((wallet, index) =>
                                <TableRow key={index}>
                                    <TableCell>{wallet.id}</TableCell>
                                    <TableCell>{wallet.name}</TableCell>
{/*
                                    <TableCell>{balances.get(wallet.id)}</TableCell>
*/}
                                    <TableCell>
                                        <Button variant="contained"
                                                startIcon={<SendIcon/>}
                                                onClick={() => {
                                                    handleOpenSendFunds(wallets[index].id)
                                                }}
                                        > Send
                                        </Button>
                                    </TableCell>
{/*                                    <TableCell>
                                        <Button color='primary' variant="contained"
                                                startIcon={<ArticleIcon/>}
                                                onClick={() => {
                                                    handleOpenViewHistory(wallets[index].id)
                                                }}>
                                            History
                                        </Button>
                                    </TableCell>*/}
                                    <TableCell>
                                        <Button color='primary' variant="contained" onClick={() => {
                                            /*deleteWallet(item.id)*/
                                            handleOpenManage(wallets[index].id)
                                        }} startIcon={<AccountBalanceWalletIcon/>}>
                                            View Wallets
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )}
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
                <Box sx={lg_modal_style}>
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

            {addresses && addresses.size &&
            <Modal
                open={openManage}
                onClose={handleCloseManage}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={lg_modal_style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    </Typography>

                    <ManageWallet accountId={walletId} depositAddress={addresses}/>
                </Box>
            </Modal>
            }

        </div>
    )
}
