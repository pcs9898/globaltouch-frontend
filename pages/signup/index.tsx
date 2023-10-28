import SignForm from "@/src/components/molecules/signForm";
import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import { withTranslations } from "@/src/commons/utils/withTranslations";

import SignUpContainer from "@/src/components/pages/signUp/signUp.container";

export const getStaticProps = withTranslations();

export default function SignUp() {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>Sign Up | globalTouch</title>
      </Head>
      <SignUpContainer />
    </>
  );
}
