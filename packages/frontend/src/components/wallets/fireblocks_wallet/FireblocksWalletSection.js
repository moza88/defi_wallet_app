import React, {useEffect} from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Section from "components/section/Section";
import SectionHeader from "components/section/SectionHeader";
import { useAuth } from "util/auth";
import {CardHeader, Button, Modal} from "@material-ui/core";
import CreateWallet from "./CreateWallet"
import ListOfWallets from "./ListOfWallets";
import {getSupportedAssets} from "../../../util/fireblocks/fireblocks_functions";

const useStyles = makeStyles((theme) => ({
    cardContent: {
        padding: theme.spacing(3),
    },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function FireblocksWalletSection(props) {
    const [openCreateWallet, setOpenCreateWallet] = React.useState(false);
    const handleCreateWallet = () => {
        setOpenCreateWallet(false);
        window.location.reload(false);

    }
    const [supportedAssets, setSupportedAssets] = React.useState([]);

    const handleOpenCreateWallet = () => {
        setOpenCreateWallet(true);
    }

    const classes = useStyles();

    const auth = useAuth();
    const router = useRouter();

    useEffect( async () => {
        await getSupportedAssets().then(r => {
            console.log(r);
            setSupportedAssets(r)
        })
    })

    return (
        <Section
            bgColor={props.bgColor}
            size={props.size}
            bgImage={props.bgImage}
            bgImageOpacity={props.bgImageOpacity}
        >
            <Container>
                <SectionHeader
                    title={props.title}
                    subtitle={props.subtitle}
                    size={4}
                    textAlign="center"
                />

                <Typography variant="h6">Onboard your customers by creating a vault.
                    Each vault can have multiple wallets per asset.</Typography>

                <Typography><b>Note: </b> You can only have one wallet asset per vault, so you can't have two Ethereum mainnent wallets in the same vault. </Typography>
                <Button variant="contained" color='primary'
                        onClick={() => {
                            handleOpenCreateWallet()
                        }}>
                    Create Vault
                </Button>

                <br/><br/>

                <ListOfWallets supportedAssets={supportedAssets}/>

                <Card>
                </Card>

                <Modal
                    open={openCreateWallet}
                    onClose={handleCreateWallet}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        </Typography>

                        <CreateWallet supportedAssets={supportedAssets}/>
                    </Box>
                </Modal>

            </Container>
        </Section>
    );
}

export default FireblocksWalletSection;
