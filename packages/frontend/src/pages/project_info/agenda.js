import React from "react";
import Meta from "components/section/Meta";
import TechnologyInfoSection from "components/project_info/TechnologyInfoSection";

function TechInfoPage(props) {
    return (
        <>
            <Meta title="Technologies for Fireblocks and BitGo" />
            <TechnologyInfoSection
                bgColor="default"
                size="medium"
                bgImage=""
                bgImageOpacity={1}
                title="Technologies for Fireblocks and BitGo"
                subtitle="Review of what technologies Fireblocks and BitGo uses to secure cryptocurrencies"
            />
        </>
    );
}

export default TechInfoPage;