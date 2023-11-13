import { withTranslations } from "@/src/commons/utils/withTranslations";
import useAuth from "@/src/components/customhooks/useAuth";
import MeContainer from "@/src/components/pages/me/me.container";
import Head from "next/head";

export const getStaticProps = withTranslations();

export default function MePage() {
  useAuth();

  return (
    <>
      <Head>
        <title>Me | globalTouch</title>
        <meta property="og:title" content="Me" />
        <meta property="og:description" content="Check my profile" />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/uyvugugihohonodjiwqd2/ogImage.png"
        />
      </Head>
      <MeContainer />;
    </>
  );
}
