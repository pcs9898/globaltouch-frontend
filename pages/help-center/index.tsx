import { withTranslations } from "@/src/commons/utils/withTranslations";
import HelpCenterContainer from "@/src/components/pages/help-center/help-center.container";

export const getStaticProps = withTranslations();

export default function HelpCenterPage() {
  return <HelpCenterContainer />;
}
