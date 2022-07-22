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
import Section from "components/section/Section";
import SectionHeader from "components/section/SectionHeader";
import DashboardItems from "components/dashboard/DashboardItems";
import { useAuth } from "util/auth";
import {CardHeader, Button} from "@material-ui/core";
import Image from "next/image";
import digital_asset_banker from "../../assets/digital_asset_banker.png";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: theme.spacing(3),
  },
}));


function WalletSection(props) {
  const classes = useStyles();

  const auth = useAuth();
  const router = useRouter();

  function moveToBitgoWallet() {
    router.push('/wallets/bitgo-wallet')
  }

  function moveToFireblocksWallet() {
    router.push('/wallets/fireblocks-wallet')
  }

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
      buttonColor={props.buttonColor}
    >
      <Container>
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={4}
          textAlign="center"
        />
        <Box textAlign="center">

          <Image
              src={digital_asset_banker}
              alt="Digital Asset Banker"
              width="850px"
              height="400px"
          />

          <br/><br/>
          <Typography >
            There are two different ways you can manage your customer's assets, you can use a multi-signature wallet like Bitgo or a multi-party computing solution like Fireblocks.
          </Typography>
          <Card>

            <CardHeader title="Bitgo"/>
            <CardContent>Bitgo is a multi-signature wallet implementation for multiple blockchain networks.
              Multi-signature is an open source protocol, and has been through thorough testing and evaluation by the security community. Multi-signature makes use of distinct private keys specifically assigned to individuals for increased accountability and transparency.</CardContent>

            <Button variant="contained" size="large" color='primary'  onClick={moveToBitgoWallet}>Bitgo Wallet</Button>
          </Card>

          <br/><br/>
          <Card>

            <CardHeader title="Fireblocks"/>
            <CardContent>
              Fireblocks is a MPC solution.
              MPC is a multi-party computing solution from the 80's that allows multiple parties, in the digital asset space, to sign a messages together while preventing any one party from viewing the logical key of another.
            </CardContent>

            <Button variant="contained" size="large" color='primary' onClick={moveToFireblocksWallet}>Fireblocks Wallet</Button>
          </Card>
        </Box>
      </Container>
    </Section>
  );
}

export default WalletSection;
