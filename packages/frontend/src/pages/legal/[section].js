import React from "react";
import { useRouter } from "next/router";
import Meta from "components/section/Meta";
import LegalSection from "components/legal/LegalSection";

function LegalPage(props) {
  const router = useRouter();

  return (
    <>
      <Meta title="Legal" />
      <LegalSection
        bgColor="default"
        size="normal"
        bgImage=""
        bgImageOpacity={1}
        section={router.query.section}
        key={router.query.section}
      />
    </>
  );
}

// Tell Next.js to export static files for each page
// See https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export const getStaticPaths = () => ({
  paths: [
    { params: { section: "terms-of-service" } },
    { params: { section: "privacy-policy" } },
  ],
  fallback: true,
});

export function getStaticProps({ params }) {
  return { props: {} };
}

export default LegalPage;
