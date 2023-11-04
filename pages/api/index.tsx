import ApiContainer from "@/src/components/pages/api/api.container";
import { withTranslations } from "@/src/commons/utils/withTranslations";

export const getStaticProps = withTranslations();

export default function ApiPage() {
  return <ApiContainer />;
}
