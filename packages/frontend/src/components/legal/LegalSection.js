import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Link from "next/link";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Section from "components/section/Section";
import LegalTerms from "components/legal/LegalTerms";
import LegalPrivacy from "components/legal/LegalPrivacy";

function LegalSection(props) {
  const validSections = {
    "terms-of-service": true,
    "privacy-policy": true,
  };

  const section = validSections[props.section]
    ? props.section
    : "terms-of-service";

  const data = {
    domain: "company.com",
    companyName: "Company",
  };

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Tabs
        value={section}
        indicatorColor="primary"
        textColor="primary"
        centered={true}
      >
        <Link
          href="/legal/terms-of-service"
          passHref={true}
          value="terms-of-service"
        >
          <Tab component="a" label="Terms of Service" />
        </Link>
        <Link
          href="/legal/privacy-policy"
          passHref={true}
          value="privacy-policy"
        >
          <Tab component="a" label="Privacy Policy" />
        </Link>
      </Tabs>
      <Box mt={5}>
        <Container>
          {section === "terms-of-service" && <LegalTerms {...data} />}

          {section === "privacy-policy" && <LegalPrivacy {...data} />}
        </Container>
      </Box>
    </Section>
  );
}

export default LegalSection;
