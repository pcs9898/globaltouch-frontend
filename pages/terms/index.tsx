import { withTranslations } from "@/src/commons/utils/withTranslations";
import TermsContainer from "@/src/components/pages/terms/terms.container";
import Head from "next/head";

export const getStaticProps = withTranslations();

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms | globalTouch</title>
        <meta property="og:title" content="Terms" />
        <meta property="og:description" content="globalTouch Terms" />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/uyvugugihohonodjiwqd2/ogImage.jpg"
        />
      </Head>
      <TermsContainer />;
    </>
  );
}
