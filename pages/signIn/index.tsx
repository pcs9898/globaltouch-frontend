import { withTranslations } from "@/src/commons/utils/withTranslations";
import SignForm from "@/src/components/molecules/signForm";
import { Flex } from "@chakra-ui/react";
import Head from "next/head";

export const getStaticProps = withTranslations();

export default function SignInPage() {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Head>Sign In</Head>
      <Flex>
        <SignForm isBtnLoading={false} onSignInSubmit={onSubmit} />
      </Flex>
    </>
  );
}
