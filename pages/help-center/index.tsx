import { withTranslations } from "@/src/commons/utils/withTranslations";
import HelpCenterContainer from "@/src/components/pages/help-center/help-center.container";
import Head from "next/head";

export const getStaticProps = withTranslations();

export default function HelpCenterPage() {
  return (
    <>
      <Head>
        <title>Help center | globalTouch</title>
        <meta property="og:title" content="Help center" />
        <meta property="og:description" content="How can i help you?" />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/uyvugugihohonodjiwqd2/ogImage.png"
        />
      </Head>
      <HelpCenterContainer />;
    </>
  );
}
