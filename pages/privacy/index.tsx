import { withTranslations } from "@/src/commons/utils/withTranslations";
import PrivacyContainer from "@/src/components/pages/privacy/privacy.container";

export const getStaticProps = withTranslations();

export default function PrivacyPage() {
  return <PrivacyContainer />;
}
