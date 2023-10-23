import { withTranslations } from "@/src/commons/utils/withTranslations";
import { Container } from "@chakra-ui/react";

// export async function getStaticPaths() {
//   // Call an external API endpoint to get projects
//   // const res = await fetch("https://.../projects");
//   // const projects = await res.json();
//   // Get the paths we want to pre-render based on projects
//   // const paths = projects.map((project) => ({
//   //   params: { projectId: project.id.toString() },
//   // }));
//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should result in a 404 page.
//   // return { fallback: false };
// }

// export async function getStaticProps({ params }) {
//   // Fetch necessary data for the project using params.projectId
// }

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default function ProjectDetailPage() {
  return (
    <Container maxW="container.xl" centerContent>
      <h1>Hello, this is the Project Detail Page!</h1>
      {/* Add more components or content here */}
    </Container>
  );
}
