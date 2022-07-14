import React from "react";
import Meta from "components/Meta";
import FireblocksWalletSection from "components/fireblocks_wallet/FireblocksWalletSection";

function FireblocksPage(props) {
    return (
        <>
            <Meta title="Fireblocks-Wallet" />
            <FireblocksWalletSection
                bgColor="default"
                size="medium"
                title="Digital Asset Management"
                subtitle="Using Fireblocks Infrastructure"
                buttonColor="primary"
                showNameField={true}
            />
        </>
    );
}

export default FireblocksPage;
