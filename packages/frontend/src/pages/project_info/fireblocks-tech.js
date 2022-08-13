import React from "react";
import Meta from "components/section/Meta";
import ProjectInfoSection from "components/project_info/ProjectInfoSection";
import FireblocksTechSection from "../../components/project_info/FirecblocksTechSection";

function FireblocksTechPage(props) {
    return (
        <>
            <Meta title="Fireblocks Technical Overview" />
            <FireblocksTechSection
                bgColor="default"
                size="medium"
                bgImage=""
                bgImageOpacity={1}
                title="Fireblocks Technical Overview"
                subtitle="Deep dive into the technologies Fireblocks uses to secure cryptocurrencies."
            />
        </>
    );
}

export default FireblocksTechPage;