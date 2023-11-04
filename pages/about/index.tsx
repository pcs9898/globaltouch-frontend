import AboutContainer from "@/src/components/pages/about/about.container";
import { withTranslations } from "@/src/commons/utils/withTranslations";

export const getStaticProps = withTranslations();

export default function AboutPage() {
  return <AboutContainer />;
}
