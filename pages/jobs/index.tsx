import { withTranslations } from "@/src/commons/utils/withTranslations";
import JobsContainer from "@/src/components/pages/jobs/jobs.container";

export const getStaticProps = withTranslations();

export default function JobsPage() {
  return <JobsContainer />;
}
