import React from "react";
import Meta from "components/section/Meta";
import TechnologyInfoSection from "components/project_info/TechnologyInfoSection";

function TechInfoPage(props) {
    return (
        <>
            <Meta title="Key Points on Fireblocks and BitGo" />
            <TechnologyInfoSection
                bgColor="default"
                size="medium"
                bgImage=""
                bgImageOpacity={1}
                title=""
                subtitle=""
            />
        </>
    );
}

export default TechInfoPage;