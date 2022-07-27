import React from "react";
import Meta from "components/section/Meta";
import HeroSection from "components/HeroSection";

function IndexPage(props) {
  return (
    <>
      <Meta />
      <HeroSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Wells Fargo's Digital Wallet"
        subtitle="Taking care of all of your crypto needs since 2022."
      />
    </>
  );
}

export default IndexPage;
