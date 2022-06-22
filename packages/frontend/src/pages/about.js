import React from "react";
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
