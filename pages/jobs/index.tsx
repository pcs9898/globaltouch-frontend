import { withTranslations } from "@/src/commons/utils/withTranslations";
import JobsContainer from "@/src/components/pages/jobs/jobs.container";
import Head from "next/head";

export const getStaticProps = withTranslations();

export default function JobsPage() {
  return (
    <>
      <Head>
        <title>Jobs | globalTouch</title>
        <meta property="og:title" content="Jobs" />
        <meta property="og:description" content="Join globalTouch" />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/uyvugugihohonodjiwqd2/ogImage.png"
        />
      </Head>
      <JobsContainer />;
    </>
  );
}
