import { withTranslations } from "@/src/commons/utils/withTranslations";
import useAuth from "@/src/components/customhooks/useAuth";
import useWithoutAuth from "@/src/components/customhooks/useWithoutAuth";
import SignForm from "@/src/components/molecules/signForm";
import SignInContainer from "@/src/components/pages/signIn/signIn.container";
import { Flex } from "@chakra-ui/react";
import Head from "next/head";

export const getStaticProps = withTranslations();

export default function SignInPage() {
  useWithoutAuth();
  return (
    <>
      <Head>
        <title>Sign In | globalTouch</title>

        <meta property="og:title" content="Sign In" />
        <meta property="og:description" content="Sign In globalTouch" />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/uyvugugihohonodjiwqd2/ogImage.jpg"
        />
      </Head>

      <SignInContainer />
    </>
  );
}
