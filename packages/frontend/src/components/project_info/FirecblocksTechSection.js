import SectionHeader from "../section/SectionHeader";
import React from "react";
import Container from "@material-ui/core/Container";
import Section from "../section/Section";
import Image from "next/image";
import fireblocks_mpc from "../../assets/fireblocks_mpc.gif";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import mpc_algs from "../../assets/mpc_algs.png";

function FireblocksTechSection(props) {

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

                <Box align="center">
                    <Image
                        src={fireblocks_mpc}
                        alt="WIP Architecture of Project's Current State"
                        width={800}
                        height={470}
                    />

                    <br/><br/>
                    <Typography variant="h5" color="textPrimary">
                        What technologies does Fireblocks use?
                    </Typography>

                    <Typography variant="body1" color="textSecondary" component="p">
                        Fireblocks uses secure multi-party computing (sMPC) to secure cryptocurrency keys along with secure enclave devices.
                        Multi-party computation (MPC) is a cryptographic tool that allows multiple parties to make calculations using their encrypted data. The encryption of the data is handled by a secure enclave device.
                    </Typography>

                <br/><br/>

                <Typography variant="h5" color="textPrimary">
                    What type of MPC implementation does Fireblocks use? MCP - CMP
                </Typography>

                <Typography variant="body1" color="textSecondary" component="p">
                    <li>
                        Fireblocks uses the MPC implementation MPC-CMP, built off MPC GG18 (Gennaro and Goldfeder's algorithm)
                    </li>
                    <li>
                        MPC-CMP allows the use of cold and hot signing mechanisms
                    </li>
                    <li>
                        At least one key share stored offline in an air-gapped device
                    </li>
                    <li>
                        Key shares (variables) are refreshed in minute long intervals, so the hacker has less than 1 min to steal all the shares
                    </li>
                    <li>
                        Requires only 1 round to sign a transaction because it uses non-interactive signing and pre-processing
                    </li>
                </Typography>

                <br/><br/>
                <Image
                    src={mpc_algs} alt="WIP Architecture of Project's Current State" width={700} height={240}>
                </Image>



                </Box>

                <Typography>
                    Lucid Chart Diagram can be found at: <a href="https://lucid.app/lucidchart/17d6ec18-0a55-4525-879f-b62e62618ec7/edit?viewport_loc=-76%2C-120%2C2273%2C1234%2C0_0&invitationId=inv_c4e17f19-afbd-43c3-8227-595913ee0788#">Lucid Chart Diagram</a>
                </Typography>

                <Typography>
                    Git Repo for this Project is: <a href="https://github.com/moza88/defi_wallet_app">Defi Wallet App</a>
                </Typography>

                <Typography>
                    Google Cloud Console Project is: <a href="https://console.firebase.google.com/u/0/project/wallet-app-54dff">Firebase Defi Wallet Console</a>
                </Typography>


            </Container>
        </Section>
    )
}

export default FireblocksTechSection;