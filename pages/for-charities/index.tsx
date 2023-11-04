import { withTranslations } from "@/src/commons/utils/withTranslations";
import ForCharitiesContainer from "@/src/components/pages/for-charities/for-charities.container";

export const getStaticProps = withTranslations();

export default function ForCharitiesPage() {
  return <ForCharitiesContainer />;
}
