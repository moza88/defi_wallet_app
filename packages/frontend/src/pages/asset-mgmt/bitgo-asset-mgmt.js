import React from "react";
import Meta from "components/section/Meta";
import BitgoMgmtSection from "../../components/asset_mgmt/BitgoMgmtSection";

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
