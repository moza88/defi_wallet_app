import React from "react";
import Container from "@material-ui/core/Container";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import Section from "components/section/Section";
import SectionHeader from "components/section/SectionHeader";

const useStyles = makeStyles((theme) => ({
  accordion: {
    // Remove shadow
    boxShadow: "none",
    "&:before": {
      // Remove default divider
      display: "none",
    },
    // Add a custom border
    "&:not(:last-child)": {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
  expanded: {
    margin: `0 !important`,
  },
  summary: {
    minHeight: 78,
  },
  summaryContent: {
    margin: "0 !important",
  },
}));

function FaqSection(props) {
  const classes = useStyles();

  const items = [
    {
      question: "How are we securing cryptocurrencies?",
      answer:
          "Cryptocurrencies are represented by key pairs, depending on if the cryptocurrency uses a UTXO or account model, different coins or transactions generate new key pairs. ",
    },
    {
      question: "What is the difference between using a multi-signature wallet and MPC in asset security?",
      answer:
        "Multi-signature wallets require more than one signature to a transaction and they are all enforced on-chain. Multi-signature wallets are specific to blockchain network because they are enforce on-chain. " +
          "MPC requires only one signature to a transaction and it's not enforced on-chain. The one signature comes from multiple key shards that are generated and signed in an ecrypted manner using homomorphic encryption. ",
    },
    {
      question: "What is the difference between vaults and wallets in Fireblocks?",
      answer:
          "Vault accounts are containers that can be used to group and organize asset wallets. Each vault account can contain one wallet for each asset type. Once you create a vault account, you can then add asset wallets with deposit addresses.",
    },
    {
      question: "What is a MPC?",
      answer:
        "Nunc nulla mauris, laoreet vel cursus lacinia, consectetur sit amet tellus. Suspendisse ut tincidunt eros. In velit mi, rhoncus dictum neque a, tincidunt lobortis justo.",
    },
    {
      question: "What is a ERC20 token?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lobortis, metus et mattis ullamcorper. Suspendisse ut tincidunt eros. In velit mi, rhoncus dictum neque a, tincidunt lobortis justo.",
    },
    {
      question: "What is a ERC1400 token?",
      answer:
        "ERC1400 is a security token that it has mechanisms to restrict its usage based on identity, jurisdiction and asset category.",
    },
    {
      question: "Where are the key shards stored?",
      answer:
        "The key shards are stored on servers and are secured using an secure enclaves (Intel SGX). Review the docs below for details:" +
          " " +
          "https://support.fireblocks.io/hc/en-us/articles/360015903159#h_01EFJ5H9S1MZAS7VGG74NXXE5A.",
    },
  ];

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container maxWidth="md">
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={4}
          textAlign="center"
        />

        {items.map((item, index) => (
          <Accordion
            classes={{
              root: classes.accordion,
              expanded: classes.expanded,
            }}
            key={index}
          >
            <AccordionSummary
              classes={{
                root: classes.summary,
                content: classes.summaryContent,
              }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`faq-panel-${index}`}
            >
              <Typography variant="h6">{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails id={`faq-panel-${index}`}>
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Section>
  );
}

export default FaqSection;
