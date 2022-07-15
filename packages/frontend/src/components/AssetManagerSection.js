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
import Image from 'next/image'
import digital_asset_mgr from '../assets/digital_asset_manager.png'

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: theme.spacing(3),
  }

}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 930,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function DashboardSection(props) {
  const classes = useStyles();

  const auth = useAuth();
  const router = useRouter();

  const [bitgoOpenVideos, setBitgoOpenVideos] = React.useState(false);

  const handleCloseBitgoVideos = () => setBitgoOpenVideos(false);

  function openBitGoVideos() {
    router.push('/bitgo-asset-mgmt');
  }

  function openFireblocksVideos() {
    router.push('/fireblocks-asset-mgmt');
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

        <Typography variant="h5">
        </Typography>

          <Image
              src={digital_asset_mgr}
              alt="Digital Asset Manager"
              width="850px"
              height="400px"
          />
          <br/><br/>

          <Typography >
            Both Bitgo and Fireblocks provide portals to help you manage your digital assets.
          </Typography>
          <br/>
          <Button
              variant="contained" color='primary'
              onClick={() => {
                openBitGoVideos()
              }}>
              BitGo's Portal
          </Button>
          <br/><br/>

          <Button
              variant="contained" color='primary'
              onClick={() => {
                openFireblocksVideos()
              }}>
            Fireblock's Portal
          </Button>

        </Box>
      </Container>
    </Section>
  );
}

export default DashboardSection;
