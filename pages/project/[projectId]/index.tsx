import { withTranslations } from "@/src/commons/utils/withTranslations";
import ProjectContainer from "@/src/components/pages/project/project.container";
import { FETCH_PROJECT } from "@/src/components/pages/project/project.queries";
import { gql } from "@apollo/client";
import { Box, Container } from "@chakra-ui/react";
import { GraphQLClient } from "graphql-request";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

// const FETCH_PROJECT_OG = gql`
//   query fetchProjectOg($project_id: String!) {
//     fetchProjectOg(project_id: $project_id) {
//       title
//       content
//     }
//   }
// `;

export default function ProjectPage(props: any) {
  return (
    <>
      <Head>
        <title>{props?.qqq?.title}</title>
        <meta property="og:title" content={props?.qqq?.title} />
        <meta property="og:description" content={props?.qqq?.content} />
        <meta property="og:image" content={props?.qqq?.image} />
      </Head>
      <ProjectContainer />
    </>
  );
}

export async function getServerSideProps(context) {
  const { locale, query } = context;

  const graphqlClient = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_URI);

  const result = await graphqlClient.request(FETCH_PROJECT, {
    project_id: query.projectId,
  });

  console.log(result);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "footer"])),
      qqq: {
        //@ts-ignore
        title: result?.fetchProject.title,
        //@ts-ignore
        content: result?.fetchProject.content,
        //@ts-ignore
        image: result?.fetchProject.projectImages[0]?.image_url,
      },
    },
  };
}
