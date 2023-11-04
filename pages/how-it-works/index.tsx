import HowItWorksContainer from "@/src/components/pages/how-it-works/how-it-works.container";
import { withTranslations } from "@/src/commons/utils/withTranslations";

export const getStaticProps = withTranslations();

export default function HowItWorksPage() {
  return <HowItWorksContainer />;
}
