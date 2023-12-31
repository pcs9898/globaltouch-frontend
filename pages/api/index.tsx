import ApiContainer from "@/src/components/pages/api/api.container";
import { withTranslations } from "@/src/commons/utils/withTranslations";
import Head from "next/head";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

export const getStaticProps = withTranslations();

export default function ApiPage() {
  return (
    <>
      <Head>
        <title>API | globalTouch</title>
        <meta property="og:title" content="API" />
        <meta property="og:description" content="API globalTouch" />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/uyvugugihohonodjiwqd2/ogImage.jpg"
        />
      </Head>
      <ApiContainer />
    </>
  );
}
