import React from "react";
import Meta from "components/Meta";
import AssetManagerSection from "components/AssetManagerSection";

function AssetManagerPage(props) {
    return (
        <>
            <Meta title="Asset Manager" />
            <AssetManagerSection
                bgColor="default"
                size="medium"
                bgImage=""
                bgImageOpacity={1}
                title="Digital Asset Operations Manager"
                subtitle="Responsible managing risks and controls around digital asset at the firm."
                buttonText="Send message"
                buttonColor="primary"
                showNameField={true}
            />
        </>
    );
}

export default AssetManagerPage;
