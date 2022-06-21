import React from "react";
import Meta from "components/Meta";
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
        title="Your landing page title here"
        subtitle="This landing page is perfect for showing off your awesome product and driving people to sign up for a paid plan."
      />
    </>
  );
}

export default IndexPage;
