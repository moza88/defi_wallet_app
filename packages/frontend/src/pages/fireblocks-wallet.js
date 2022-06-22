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
                bgImage=""
                bgImageOpacity={1}
                title="Fireblocks Wallet"
                subtitle=""
                buttonText="Send message"
                buttonColor="primary"
                showNameField={true}
            />
        </>
    );
}

export default FireblocksPage;
