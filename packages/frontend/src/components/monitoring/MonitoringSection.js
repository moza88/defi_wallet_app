import SectionHeader from "../SectionHeader";
import React from "react";
import Container from "@material-ui/core/Container";
import Section from "../Section";

function MonitoringSection(props) {

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


                </Container>
            </Section>
    )
}

export default MonitoringSection;