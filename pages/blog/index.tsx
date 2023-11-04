import BlogContainer from "@/src/components/pages/blog/blog.container";
import { withTranslations } from "@/src/commons/utils/withTranslations";

export const getStaticProps = withTranslations();

export default function BlogPage() {
  return <BlogContainer />;
}
