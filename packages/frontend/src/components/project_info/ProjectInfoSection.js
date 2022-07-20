import SectionHeader from "../SectionHeader";
import React from "react";
import Container from "@material-ui/core/Container";
import Section from "../Section";
import Image from "next/image";
import wip_architecture from "../../assets/wip_architecture.png";
import Typography from "@material-ui/core/Typography";

function ProjectInfoSection(props) {

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

                <Typography>
                    WIP Architecture of Project's Current State
                </Typography>
                <Image
                    src={wip_architecture}
                    alt="WIP Architecture of Project's Current State"
                />

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

export default ProjectInfoSection;