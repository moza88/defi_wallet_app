import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import VideoEmbed from "../video/VideoEmbed";
import React from "react";
import Container from "@material-ui/core/Container";
import SectionHeader from "../SectionHeader";
import Section from "../Section";

export default function Bitgo_Mgmt(props) {

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
            <Box mt={8}>
                <Typography align="center" variant="h6">Workspace Management</Typography>
                <VideoEmbed embedId="729725788" />

                <Typography align="center" variant="h6">Add Users & Approvers</Typography>
                <VideoEmbed embedId="729725788" />
            </Box>
        </Container>
        </Section>

    )
}