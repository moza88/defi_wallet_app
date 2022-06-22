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
import {CardHeader, Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: theme.spacing(3),
  },
}));


function DashboardSection(props) {
  const classes = useStyles();

  const auth = useAuth();
  const router = useRouter();

  function moveToBitgoWallet() {
    router.push('/bitgo-wallet')
  }

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
        <Typography>Welcome back {auth.user.email}! Which wallet would like to view?</Typography>

          <Card>
            <CardHeader>BitGo</CardHeader>
            <CardContent>Bitgo is a multi-signature wallet</CardContent>

            <Button onClick={moveToBitgoWallet}>Bitgo Wallet</Button>
          </Card>

        <Card>
          <CardHeader>Fireblocks</CardHeader>
          <CardContent>Fireblocks is a MPC solution</CardContent>
        </Card>


      </Container>
    </Section>
  );
}

export default DashboardSection;
