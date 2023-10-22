import SignForm from "@/src/components/molecules/signForm";
import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import { withTranslations } from "@/src/commons/utils/withTranslations";

export const getStaticProps = withTranslations();

export default function SignUp() {
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <Head>Sign Up</Head>
      <Flex>
        <SignForm isBtnLoading={false} onSignUpSubmit={onSubmit} />
      </Flex>
    </>
  );
}
