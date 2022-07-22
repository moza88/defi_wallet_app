import React from "react";
import Meta from "components/section/Meta";
import BitgoWalletSection from "components/wallets/bitgo_wallet/BitgoWalletSection";

function BigoWalletPage(props) {
    return (
        <>
            <Meta title="Bitgo-Wallet" />
            <BitgoWalletSection
                bgColor="default"
                size="medium"
                title="Digital Asset Banking - Bitgo"
                subtitle="The underlying technology is a multi-signature wallet driven infrastructure powered by Bitgo and Wells Fargo."
                buttonColor="primary"
                showNameField={true}
            />
        </>
    );
}

export default BigoWalletPage;
