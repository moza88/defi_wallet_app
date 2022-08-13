import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import VideoEmbed from "../video/VideoEmbed";
import React from "react";
import Container from "@material-ui/core/Container";
import SectionHeader from "../section/SectionHeader";
import Section from "../section/Section";
import Image from "next/image";
import accounts_using_bitgo from "../../assets/accounts_using_bitgo.png";

export default function BitgoMgmtSection(props) {

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
                    src={accounts_using_bitgo}
                    alt="Account Structure with Bitgo"
                    width="670px"
                    height="500px"
                />

                <br/><br/>
                <Typography align="center" variant="h5">There are multiple signatures to a transaction.</Typography>

                <br/><br/><br/>

                <Typography align="center" variant="h5">Workspace Management</Typography>
                <VideoEmbed embedId="731622211" />


                <br/>

                <Typography align="center" variant="h5">Adding Users</Typography>
                <VideoEmbed embedId="731774770" />

                <br/>

                <Typography align="center" variant="h5">Approvals</Typography>
                <VideoEmbed embedId="727134344" />


                <br/>

                <Typography align="center" variant="h5">Creating API Key</Typography>

                <br/>

                <Typography align="center" variant="h5">Collaborating on a Txn</Typography>
                <VideoEmbed embedId="727134344" />

                <br/>

                <Typography align="center" variant="h5">Creating Wallets & Setting Policy</Typography>
                <VideoEmbed embedId="731795310" />
            </Box>
        </Container>
        </Section>

    )
}