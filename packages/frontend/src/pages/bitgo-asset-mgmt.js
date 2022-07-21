import React from "react";
import Meta from "components/Meta";
import BitgoMgmtSection from "../components/digital_asset_mgr/BitgoMgmtSection";

function BitgoMgmtPage(props) {
  return (
    <>
      <Meta title="Bitgo Management Clips" />
      <BitgoMgmtSection
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
