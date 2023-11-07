import { withTranslations } from "@/src/commons/utils/withTranslations";
import { Box, Container, Flex, Spinner } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default function CountryDetailPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);

  return (
    <>
      <Head>
        <title>globalTouch</title>
        <meta property="og:title" content="globalTouch" />
        <meta property="og:description" content="Start a new project" />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/uyvugugihohonodjiwqd/logo.svg"
        />
      </Head>
      <Flex
        h={{ base: "calc(100vh - 3.5rem)", md: "calc(100vh - 5rem)" }}
        w="100vw"
      >
        <Spinner size="xl" colorScheme="teal" />
      </Flex>
    </>
  );
}
