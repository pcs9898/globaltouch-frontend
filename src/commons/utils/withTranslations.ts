import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const withTranslations = (namespaces = ["common"]) => {
  return async ({ locale }) => ({
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
    },
  });
};
