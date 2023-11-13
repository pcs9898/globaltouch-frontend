import { withTranslations } from "@/src/commons/utils/withTranslations";
import SearchContainer from "@/src/components/pages/search/search.container";
import Head from "next/head";

export const getStaticProps = withTranslations();

export default function SearchPage() {
  return (
    <>
      <Head>
        <title>Search | globalTouch</title>
        <meta property="og:title" content="Search" />
        <meta property="og:description" content="Search projects" />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/uyvugugihohonodjiwqd2/ogImage.png"
        />
      </Head>
      <SearchContainer />
    </>
  );
}
