import Head from "next/head";
import { withTranslations } from "@/src/commons/utils/withTranslations";
import HomeContainer from "@/src/components/pages/home/home.continer";

export const getStaticProps = withTranslations();

export default function HomePage({ onClose }) {
  return (
    <>
      <Head>
        <title>globalTouch</title>

        <meta property="og:title" content="globalTouch" />
        <meta
          property="og:description"
          content="Start a new project in globalTouch"
        />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/uyvugugihohonodjiwqd2/ogImage.png"
        />
      </Head>

      <HomeContainer />
    </>
  );
}
