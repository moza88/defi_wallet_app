import React from "react";
import Meta from "components/Meta";
import HeroSection from "components/hero/HeroSection";
import TeamBiosSection from "components/TeamBiosSection";
import Identity from "../components/identity/Identity";
import {useAuth} from "../util/auth";

function AboutPage(props) {
  const auth = useAuth();

  return (
      <>

        <Identity/>
      </>
  );
}

export default AboutPage;
