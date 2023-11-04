import { withTranslations } from "@/src/commons/utils/withTranslations";
import TermsContainer from "@/src/components/pages/terms/terms.container";

export const getStaticProps = withTranslations();

export default function TermsPage() {
  return <TermsContainer />;
}
