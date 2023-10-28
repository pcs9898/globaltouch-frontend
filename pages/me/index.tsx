import { withTranslations } from "@/src/commons/utils/withTranslations";
import useAuth from "@/src/components/customhooks/useAuth";

export const getStaticProps = withTranslations();

export default function MePage() {
  useAuth();
  return "hi";
}
