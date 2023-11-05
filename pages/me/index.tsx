import { withTranslations } from "@/src/commons/utils/withTranslations";
import MeContainer from "@/src/components/pages/me/me.container";

export const getStaticProps = withTranslations();

export default function MePage() {
  return <MeContainer />;
}
