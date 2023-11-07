import BlogContainer from "@/src/components/pages/blog/blog.container";
import { withTranslations } from "@/src/commons/utils/withTranslations";
import Head from "next/head";

export const getStaticProps = withTranslations();

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>Blog | globalTouch</title>
        <meta property="og:title" content="Blog" />
        <meta property="og:description" content="globalTouch Blog" />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/uyvugugihohonodjiwqd/logo.svg"
        />
      </Head>
      <BlogContainer />;
    </>
  );
}
