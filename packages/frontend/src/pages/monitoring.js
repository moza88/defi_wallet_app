import React from "react";
import Meta from "components/Meta";
import MonitoringSection from "components/monitoring/MonitoringSection";

function MonitoringPage(props) {
    return (
        <>
            <Meta title="Faq" />
            <MonitoringSection
                bgColor="default"
                size="medium"
                bgImage=""
                bgImageOpacity={1}
                title="Monitoring"
                subtitle="Finding Fraud"
            />
        </>
    );
}

export default MonitoringPage;