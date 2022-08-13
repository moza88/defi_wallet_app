import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import VideoEmbed from "../video/VideoEmbed";
import React from "react";
import Container from "@material-ui/core/Container";
import SectionHeader from "../section/SectionHeader";
import Section from "../section/Section";
import Image from "next/image";
import tap_retail_ex from "../../assets/tap_retail_ex.png";
import tap_policy from "../../assets/tap_policy.png";
import accounts_using_fireblocks from "../../assets/accounts_using_fireblocks.png";

export default function FireblocksMgmtSection(props) {

    return(
        <Section
            bgColor={props.bgColor}
            size={props.size}
            bgImage={props.bgImage}
            bgImageOpacity={props.bgImageOpacity}
        >
            <SectionHeader
                title={props.title}
                subtitle={props.subtitle}
                size={4}
                textAlign="center"
            />
        <Container>
            <Box align="center">

                <Image
                    src={accounts_using_fireblocks}
                    alt="Account Structure with Bitgo"
                    width="830px"
                    height="600px"
                />

                <br/><br/>

                <Typography align="center" variant="h5">There is only 1 signature to a transaction.</Typography>

                <br/><br/><br/>
                <Typography align="center" variant="h5">Workspace Management</Typography>
                <VideoEmbed embedId="729740514" />

                <br/>

                <Typography align="center" variant="h5">Add Users & Approves</Typography>
                <VideoEmbed embedId="730210605" />

                <br/>

                <Typography align="center" variant="h5">Issuing API Key to Control Assets</Typography>
                <VideoEmbed embedId="729725788" />

                <br/><br/><br/>

                <Typography align="center" variant="h5">Enforcing Digital Asset Policies</Typography>
                <br/>
                <Typography>Excel Spreadsheet for Specifying Policy. This spreadsheet needs to be submitted to a Fireblocks support staff.</Typography>
                <Image
                    src={tap_retail_ex}
                    alt="Digital Asset Manager"
                    width="850px"
                    height="400px"
                />
                <br/><br/>
                <Typography>View on policies that are enforced in this workspace.</Typography>
                <Image
                    src={tap_policy}
                    alt="Digital Asset Manager"
                    width="850px"
                    height="400px"
                />

            </Box>
        </Container>
        </Section>

    )
}