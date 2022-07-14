import React from "react";
import Meta from "components/Meta";
import BitgoWalletSection from "components/bitgo_wallet/BitgoWalletSection";

function BigoWalletPage(props) {
    return (
        <>
            <Meta title="Bitgo-Wallet" />
            <BitgoWalletSection
                bgColor="default"
                size="medium"
                title="Digital Asset Management"
                subtitle="Using BitGo"
                buttonColor="primary"
                showNameField={true}
            />
        </>
    );
}

export default BigoWalletPage;
