import React from "react";
import Meta from "components/Meta";
import ContactSection from "components/contact/ContactSection";
import Bitgo_Mgmt from "../components/digital_asset_mgr/Bitgo_Mgmt";

function BitgoMgmtPage(props) {
  return (
    <>
      <Meta title="Bitgo Management Clips" />
      <Bitgo_Mgmt
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Bitgo Digital Asset Management Portal"
        subtitle=""
        buttonText="Send message"
        buttonColor="primary"
        showNameField={true}
      />
    </>
  );
}

export default BitgoMgmtPage;
