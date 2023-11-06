import { withTranslations } from "@/src/commons/utils/withTranslations";
import useAuth from "@/src/components/customhooks/useAuth";
import MeContainer from "@/src/components/pages/me/me.container";

export const getStaticProps = withTranslations();

export default function MePage() {
  useAuth();

  return <MeContainer />;
}
