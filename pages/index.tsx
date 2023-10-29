import Head from "next/head";
import { withTranslations } from "@/src/commons/utils/withTranslations";
import HomeContainer from "@/src/components/pages/home/home.continer";

export const getStaticProps = withTranslations();

export default function HomePage({ onClose }) {
  return (
    <>
      <Head>
        <title>globalTouch</title>
      </Head>

      <HomeContainer />
    </>
  );
}
