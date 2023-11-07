import { withTranslations } from "@/src/commons/utils/withTranslations";
import LocationsContainer from "@/src/components/pages/locations/locations.container";
import Head from "next/head";

export const getStaticProps = withTranslations();

export default function LocationsPage() {
  return (
    <>
      <Head>
        <title>Locations | globalTouch</title>
        <meta property="og:title" content="Locations" />
        <meta property="og:description" content="Locations globalTouch" />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/uyvugugihohonodjiwqd/logo.svg"
        />
      </Head>
      <LocationsContainer />;
    </>
  );
}
