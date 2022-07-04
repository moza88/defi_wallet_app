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
    const [walletNames, setWalletNames] = useState([]);
    const [walletId, setWalletId] = useState('');
    const [openSendFunds, setOpenSendFunds] = React.useState(false);

    const [openShareWallet, setOpenShareWallet] = useState(false);

    const [openDetails, setOpenDetails] = React.useState(false);
    const [coin, setCoin] = useState("ETH_TEST");

    const handleCloseSendFunds = () => setOpenSendFunds(false);
    const handleCloseDetails = () => setOpenDetails(false);
    const handleCloseShareWallet = () => setOpenShareWallet(false);

    const [values, setValues] = useState([
        "BTC_TEST",
        "ETH_TEST"
    ]);

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

    function refreshPage() {
        window.location.reload(false);
    }

    const deleteWallet = (walletId) => {

        console.log("deleting wallet " + walletId)

        var req_url = process.env.NEXT_PUBLIC_FIREBLOCKS_SERVER + "/delete_wallet/" +
            "coin=" +coin + "/" + "walletId=" + walletId


        fetch(req_url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                getWallets(coin);
            })

    }

    const createWallet = (vaultName, asset) => {
        console.log(vaultName, asset);

        fetch(process.env.NEXT_PUBLIC_FIREBLOCKS_SERVER + '/create_vault_wallet/', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                vaultName: vaultName,
                asset: asset
            })
        }).then(response => response.json())
            .then(walletInfo => {
                console.log(walletInfo)

                setNewWalletId(walletInfo.id)
                setRecieverAddress(walletInfo.address)
            });
    }


    function getWallets(coin) {
        var req_url = process.env.NEXT_PUBLIC_FIREBLOCKS_SERVER +"/getVaultAccounts";
        console.log(req_url);

        fetch(req_url, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                namePrefix: "WF",
                nameSuffix: "",
                minAmountThreshold: 0,
                assetId: "coin"
            })
        }).then(response => {
           // response.json()
            console.log(response.json()
                .then(data => {
                console.log(data.accounts[0].name)
                for(const element of data.accounts) {
                    console.log(element.name)
                    setWalletNames(walletNames => [...walletNames, element.name])
                    setWalletId(walletId => [...walletId, element.id])
                }
            }))
        }).catch((error)=> {
            console.log(error)
        })
    }

    useEffect(() => {
        getWallets(coin)
        console.log(walletNames)
    }, [])

    return (
        <div>
            <Card sx={{ maxWidth: 345 }} >

                <br></br>
                <Typography variant="h5" align="center">Fireblocks {coin.toUpperCase()} Wallets</Typography>

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
                                return <MenuItem key={index} value={value}>{value}</MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                </Container>

                <br></br>
                <TableContainer component={Paper}>
                    <Table stickyHeader  aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Balance</TableCell>
                                <TableCell>Send Funds</TableCell>
                                <TableCell>History</TableCell>
                                <TableCell>Delete</TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>

                            {walletNames.length && walletNames.map( (name,index)=>
                                <TableRow key={index}>
                                    <TableCell>{walletId[index]}</TableCell>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>balance</TableCell>
                                    <TableCell>
                                        <Button variant="contained"
                                                startIcon={<SendIcon />}
                                                onClick={() => {
                                                    handleOpenSendFunds(walletId[index])
                                                }}
                                        > Send
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button color='primary' variant="contained"
                                                startIcon={<ArticleIcon />}
                                                onClick={() => {
                                                    handleOpenViewHistory(item.id)
                                                }}>
                                            History
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button color='primary' variant="contained" onClick={() => {
                                            deleteWallet(item.id)
                                        }} startIcon={<DeleteIcon />}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )}
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
