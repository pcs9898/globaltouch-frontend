import { withTranslations } from "@/src/commons/utils/withTranslations";
import { Box, Container } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "footer"])),
    },
  };
}

export default function ProjectDetailPage() {
  // const router = useRouter();

  // console.log(router);
  return (
    <Box>
      <h1>Hello, this is the Project Detail Page!</h1>
      {/* Add more components or content here */}
    </Box>
  );
}
