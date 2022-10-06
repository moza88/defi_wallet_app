import SectionHeader from "../section/SectionHeader";
import React from "react";
import Container from "@material-ui/core/Container";
import Section from "../section/Section";
import Image from "next/image";
import fireblocks_key_mgmt_mpc from "../../assets/fireblocks_key_mgmt_mpc.png";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import router from "next/router";
import Box from "@material-ui/core/Box";
import tap_policy from "../../assets/tap_policy.png";
import agenda from "../../assets/agenda.png"
import keypoints from "../../assets/keypoints.png"
import {ListItem, ListItemText} from "@material-ui/core";

function TechnologyInfoSection(props) {

    function fireblocks_tech() {
        router.push('/project_info/fireblocks-tech');
    }

    function bitgo_tech() {
        router.push('/project_info/bitgo-tech');
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

                <Image
                    src={keypoints}
                    alt="agenda"
                    width="850px"
                    height="500px"
                />
{/*                <Typography variant="h5">
                    Differences between Fireblocks and BitGo
                </Typography>



                <Box align="center">
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={fireblocks_tech}>
                        Learn More About Fireblocks
                    </Button>
                    <br/><br/>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={bitgo_tech}>
                        Learn More About BitGo
                    </Button>
                </Box>*/}


            </Container>
        </Section>
    )
}

export default TechnologyInfoSection;