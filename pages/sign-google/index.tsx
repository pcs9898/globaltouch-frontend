import { withTranslations } from "@/src/commons/utils/withTranslations";
import SignGoogleContainer from "@/src/components/pages/signGoogle/signGoogle.container";

export const getStaticProps = withTranslations();

export default function SignGooglePage() {
  return <SignGoogleContainer />;
}
