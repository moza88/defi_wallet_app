import React from "react";
import Meta from "components/Meta";
import ContactSection from "components/contact/ContactSection";
import Bitgo_Mgmt from "../components/digital_asset_mgr/BitgoMgmtSection";
import FireblocksMgmtSection from "../components/digital_asset_mgr/FireblocksMgmtSection";

function FireblocksMgmtPage(props) {
  return (
    <>
      <Meta title="Fireblocks Digital Asset Ops Management" />
      <FireblocksMgmtSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Fireblocks Digital Asset Management Portal"
        subtitle=""
        buttonText="Send message"
        buttonColor="primary"
        showNameField={true}
      />
    </>
  );
}

export default FireblocksMgmtPage;
