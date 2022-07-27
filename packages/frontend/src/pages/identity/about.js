import React from "react";
import Identity from "../../components/identity/Identity";
import {useAuth} from "../../util/auth";
import Meta from "../../components/section/Meta";
import DashboardSection from "../../components/dashboard/DashboardSection";
import IdentitySection from "../../components/identity/IdentitySection";

function AboutPage(props) {
  const auth = useAuth();

  return (
      <>
          <Meta title="Identity" />
          <IdentitySection
              bgColor="default"
              size="medium"
              bgImage=""
              bgImageOpacity={1}
              title="Identity"
              subtitle=""
              buttonColor='primary'
          />
      </>
  );
}

export default AboutPage;
