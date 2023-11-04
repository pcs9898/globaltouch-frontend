import { withTranslations } from "@/src/commons/utils/withTranslations";
import LocationsContainer from "@/src/components/pages/locations/locations.container";

export const getStaticProps = withTranslations();

export default function LocationsPage() {
  return <LocationsContainer />;
}
