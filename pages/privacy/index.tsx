import { withTranslations } from "@/src/commons/utils/withTranslations";
import PrivacyContainer from "@/src/components/pages/privacy/privacy.container";
import Head from "next/head";

export const getStaticProps = withTranslations();

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy | globalTouch</title>
        <meta property="og:title" content="Privacy" />
        <meta property="og:description" content="How we keep privacy" />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/uyvugugihohonodjiwqd2/ogImage.jpg"
        />
      </Head>
      <PrivacyContainer />;
    </>
  );
}
