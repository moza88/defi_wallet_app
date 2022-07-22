import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Section from "components/section/Section";
import SectionHeader from "components/section/SectionHeader";
import Image from "next/image";
import bob_digital_asset_banker from "../assets/bob_digital_asset_banker.png";
import dolly_digital_asset_ops_mgr from "../assets/dolly_digital_asset_ops_mgr.png";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";

function HeroSection(props) {

  const router = useRouter();

  function handleClickDigitalAssetOps() {
    router.push("/asset-mgmt/asset-manager");
  }

  function handleClickDigitalAssetBanker() {
    router.push("/wallets/wallets");
  }

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <Box textAlign="center">
          <SectionHeader
            title={props.title}
            subtitle={props.subtitle}
            size={4}
          />

          <Button
            onClick={handleClickDigitalAssetOps}>
            <Image
                src={dolly_digital_asset_ops_mgr}
                alt="Digital Asset Manager"
                width="350px"
                height="470px"
            />
          </Button>


          <Button
            onClick={handleClickDigitalAssetBanker}>
            <Image
                src={bob_digital_asset_banker}
                alt="Digital Asset Banker"
                width="350px"
                height="470px"
            />
            </Button>



        </Box>
      </Container>
    </Section>
  );
}

export default HeroSection;
