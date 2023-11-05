import { withTranslations } from "@/src/commons/utils/withTranslations";
import SearchContainer from "@/src/components/pages/search/search.container";

export const getStaticProps = withTranslations();

export default function SearchPage() {
  return <SearchContainer />;
}
