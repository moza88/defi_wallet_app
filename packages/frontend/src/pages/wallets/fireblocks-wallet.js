import React from "react";
import Meta from "components/section/Meta";
import FireblocksWalletSection from "components/wallets/fireblocks_wallet/FireblocksWalletSection";

function FireblocksPage(props) {
    return (
        <>
            <Meta title="Fireblocks-Wallet" />
            <FireblocksWalletSection
                bgColor="default"
                size="medium"
                title="Digital Asset Banking - Fireblocks"
                subtitle="The underlying technology is a multi-party computing & enclave driven infrastructure powered by Bitgo and Wells Fargo."
                buttonColor="primary"
                showNameField={true}
            />
        </>
    );
}

export default FireblocksPage;
