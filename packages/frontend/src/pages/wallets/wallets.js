import React from "react";
import Meta from "components/section/Meta";
import DashboardSection from "components/dashboard/DashboardSection";
import { requireAuth } from "util/auth";
import WalletSection from "../../components/wallets/WalletSection";

function DashboardPage(props) {
  return (
    <>
      <Meta title="Wallets" />
      <WalletSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Digital Asset Banker"
        subtitle="The digital asset bankers onboards and helps you to manage your digital assets."
      />
    </>
  );
}

export default requireAuth(DashboardPage);
