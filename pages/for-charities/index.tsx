import { withTranslations } from "@/src/commons/utils/withTranslations";
import ForCharitiesContainer from "@/src/components/pages/for-charities/for-charities.container";
import Head from "next/head";

export const getStaticProps = withTranslations();

export default function ForCharitiesPage() {
  return (
    <>
      <Head>
        <title>For charities | globalTouch</title>
        <meta property="og:title" content="For Charities" />
        <meta property="og:description" content="For Charities" />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/uyvugugihohonodjiwqd2/ogImage.png"
        />
      </Head>
      <ForCharitiesContainer />
    </>
  );
}
