import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LinkMui from "@material-ui/core/Link";
import Link from "next/link";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import DashboardItems from "components/dashboard/DashboardItems";
import { useAuth } from "util/auth";
import {CardHeader, Button, Modal} from "@material-ui/core";
import CreateWallet from "./CreateWallet"
import ListOfWallets from "./ListOfWallets";

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
    const handleCreateWallet = () => setOpenCreateWallet(false);

    const handleOpenCreateWallet = () => {
        setOpenCreateWallet(true);
    }

    const classes = useStyles();

    const auth = useAuth();
    const router = useRouter();

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

                <Typography variant="h6">Don't have a wallet? Click below to create one</Typography>
                <Button variant="contained" color='primary'
                        onClick={() => {
                            handleOpenCreateWallet()
                        }}>
                    Create Wallet
                </Button>

                <br/><br/>
                <Typography variant="h6">Below are your vaults</Typography>

                <ListOfWallets/>

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

                        <CreateWallet/>
                    </Box>
                </Modal>

            </Container>
        </Section>
    );
}

export default FireblocksWalletSection;
