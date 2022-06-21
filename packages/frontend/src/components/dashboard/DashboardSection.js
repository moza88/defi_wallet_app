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
import {CardHeader} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: theme.spacing(3),
  },
}));

function DashboardSection(props) {
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
          <Card>
            {auth.user.email}
            <CardHeader>BitGo</CardHeader>
            <CardContent>Bitgo is a multi-signature wallet</CardContent>
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
