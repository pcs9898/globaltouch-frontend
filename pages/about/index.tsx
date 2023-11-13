import AboutContainer from "@/src/components/pages/about/about.container";
import { withTranslations } from "@/src/commons/utils/withTranslations";
import Head from "next/head";

export const getStaticProps = withTranslations();

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About | globalTouch</title>
        <meta property="og:title" content="About" />
        <meta property="og:description" content="About globalTouch" />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/uyvugugihohonodjiwqd2/ogImage.jpg"
        />
      </Head>
      <AboutContainer />
    </>
  );
}
