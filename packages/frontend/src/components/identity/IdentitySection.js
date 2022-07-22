import {React, useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Section from "components/section/Section";
import SectionHeader from "components/section/SectionHeader";
import Button from "@material-ui/core/Button";
import { ThreeIdConnect,  EthereumAuthProvider } from '@3id/connect'
import {useViewerConnection, useViewerRecord} from '@self.id/framework'
import { usePublicRecord } from '@self.id/framework'
import CeramicClient from "@ceramicnetwork/http-client";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useForm} from "react-hook-form";
import CardContent from "@material-ui/core/CardContent";
import {Card, CardHeader, Table, TableCell, TableRow} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

const API_URL = 'https://ceramic-clay.3boxlabs.com';
const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: theme.spacing(3),
  },
}));

function IdentitySection(props) {
  const [testDoc, setTestDoc] = useState();
  const [loadedDoc, setLoadedDoc] = useState();
  const [updatedDoc, setUpdatedDoc] = useState();
  const [streamId, setStreamId] = useState();
  const [ceramic, setCeramic] = useState();
  const [ethAddresses, setEthAddresses] = useState();
  const [ethereum, setEthereum] = useState();
  const [commits, setCommits] = useState([]);
  const classes = useStyles();
  const [connection, connect, disconnect] = useViewerConnection()
  const record = useViewerRecord('basicProfile')
  const router = useRouter();
  const [name, setName] = useState('')
  const [pending, setPending] = useState(false);
  const { handleSubmit, getValues, errors, sendFunds } = useForm();

  const [idNumber, setIdNumber] = useState('')
  const [state, setState] = useState('')
  const [organDonar, setOrganDonar] = useState('')

  function onSubmit() {
    record.merge({
      idNumber: idNumber,
      state: state,
      organDonar: organDonar,
      salary: '343444'
    })
    setName(record.content.name)
  }

  //Sign Up with Metamask Wallet
  useEffect(() => {
    if(window.ethereum) {
      setEthereum(window.ethereum);
      (async() => {
        try {
          const addresses = await window.ethereum.request({ method: 'eth_requestAccounts'})
          setEthAddresses(addresses);
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          })
          await connect(new EthereumAuthProvider(window.ethereum, accounts[0]))
        }
        catch(e) {
          console.log(e);
        }
      })();
    }
  }, []);

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
          {ethAddresses}

          {connection.status === 'connected' ? (
              <p>{connection.selfID.id}</p>
          ):
              <p>Not Connected Yet</p>
          }

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container={true} spacing={2}>

              <Grid item={true} xs={12}>
                <TextField
                    variant="outlined"
                    type="text"
                    label="ID Number"
                    name="idNumber"
                    fullWidth={true}
                    onChange={(e) => setIdNumber(e.target.value)}
                />
              </Grid>

              <Grid item={true} xs={12}>
                <TextField
                    variant="outlined"
                    type="text"
                    label="State"
                    name="state"
                    fullWidth={true}
                    onChange={(e) => setState(e.target.value)}
                />
              </Grid>
              <Grid item={true} xs={12}>
                <TextField
                    variant="outlined"
                    type="text"
                    label="Organ Donor"
                    name="organDonor"
                    fullWidth={true}
                    onChange={(e) => setOrganDonar(e.target.value)}
                />
              </Grid>
              <Grid item={true} xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    disabled={pending}
                    fullWidth={true}
                >
                  {!pending && <span>Enter ID Info</span>}

                  {pending && <CircularProgress size={28} />}
                </Button>
              </Grid>
            </Grid>
          </form>
          <br/><br/>
          {idNumber && record &&
          <Card>
            <CardHeader title="Info Commited to the Network"/>
            <CardContent>
              <Table>
                <TableRow>
                  <TableCell>ID Number</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>Organ Donor</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{record.content.idNumber}</TableCell>
                  <TableCell>{record.content.state}</TableCell>
                  <TableCell>{record.content.organDonar}</TableCell>
                </TableRow>
              </Table>
             </CardContent>
            <Typography variant="h6" gutterBottom>
              Verify your identity in any Ceramic Node or web app connected to Ceramic. <br/>
              <Link href="https://ceramicstudio.github.io/web-playground/">Ceramic Playground</Link>

            </Typography>
          </Card>


          }
        </Box>
      </Container>
    </Section>
  );
}

export default IdentitySection;
