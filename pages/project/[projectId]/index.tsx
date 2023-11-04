import { withTranslations } from "@/src/commons/utils/withTranslations";
import ProjectContainer from "@/src/components/pages/project/project.container";
import { Box, Container } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "footer"])),
    },
  };
}

export default function ProjectPage() {
  return (
    <>
      <Head>
        <title>Project</title>
      </Head>
      <ProjectContainer />
    </>
  );
}
