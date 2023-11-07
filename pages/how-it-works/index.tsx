import HowItWorksContainer from "@/src/components/pages/how-it-works/how-it-works.container";
import { withTranslations } from "@/src/commons/utils/withTranslations";
import Head from "next/head";

export const getStaticProps = withTranslations();

export default function HowItWorksPage() {
  return (
    <>
      <Head>
        <title>How globalTouch works</title>
        <meta property="og:title" content="How globalTouch works" />
        <meta property="og:description" content="How start a new project" />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/uyvugugihohonodjiwqd/logo.svg"
        />
      </Head>
      <HowItWorksContainer />
    </>
  );
}
