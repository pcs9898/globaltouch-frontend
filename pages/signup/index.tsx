import SignForm from "@/src/components/molecules/signForm";
import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import { withTranslations } from "@/src/commons/utils/withTranslations";

import SignUpContainer from "@/src/components/pages/signUp/signUp.container";
import useWithoutAuth from "@/src/components/customhooks/useWithoutAuth";

export const getStaticProps = withTranslations();

export default function SignUp() {
  useWithoutAuth();
  return (
    <>
      <Head>
        <title>Sign Up | globalTouch</title>

        <meta property="og:title" content="Sign Up" />
        <meta property="og:description" content="Sign Up globalTouch" />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/uyvugugihohonodjiwqd/logo.svg"
        />
      </Head>
      <SignUpContainer />
    </>
  );
}
