import BlogContainer from "@/src/components/pages/blog/blog.container";
import { withTranslations } from "@/src/commons/utils/withTranslations";
import Head from "next/head";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import MapComponent from "@/src/components/molecules/googleMap/googleMap.md";

export const getStaticProps = withTranslations();

export default function BlogPage() {
  const [position, setPosition] = useState({ coordinates: [50, 50], zoom: 4 });

  const handleMoveEnd = (position) => {
    setPosition(position);
  };
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
      {/* <BlogContainer />; */}

      <MapComponent />
    </>
  );
}
