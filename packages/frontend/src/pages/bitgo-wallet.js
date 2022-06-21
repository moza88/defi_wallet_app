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
                bgImage=""
                bgImageOpacity={1}
                title="Bitgo Wallet"
                subtitle=""
                buttonText="Send message"
                buttonColor="primary"
                showNameField={true}
            />
        </>
    );
}

export default BigoWalletPage;
