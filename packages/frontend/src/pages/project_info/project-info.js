import React from "react";
import Meta from "components/section/Meta";
import ProjectInfoSection from "components/project_info/ProjectInfoSection";

function ProjectInfoPage(props) {
    return (
        <>
            <Meta title="Information on Project" />
            <ProjectInfoSection
                bgColor="default"
                size="medium"
                bgImage=""
                bgImageOpacity={1}
                title="Project Information"
                subtitle="Details on this implementation of the project"
            />
        </>
    );
}

export default ProjectInfoPage;