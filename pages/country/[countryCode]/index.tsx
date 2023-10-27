import { withTranslations } from "@/src/commons/utils/withTranslations";
import { Container } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default function CountryDetailPage() {
  // const router = useRouter();

  // console.log(router);
  return (
    <Container maxW="container.xl" centerContent>
      <h1>Hello, this is the Project Detail Page!</h1>
      {/* Add more components or content here */}
    </Container>
  );
}
