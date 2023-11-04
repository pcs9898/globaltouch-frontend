import { Flex, HStack, Select, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useChangeLocale } from "../../customhooks/useChangeLocale";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

const localeObg = {
  en: ["🇺🇸 English", "🇰🇷 Korean"],
  ko: ["🇰🇷 한국어", "🇺🇸 영어"],
};

export default function Footer() {
  const router = useRouter();
  const changeLocale = useChangeLocale();
  const { t } = useTranslation();

  const [currentLocale, setCurrentLocale] = useState(router.locale);

  useEffect(() => {
    setTimeout(() => {
      setCurrentLocale(router.locale);
    }, 100);
  }, [router.locale]);

  const year = new Date().getFullYear();

  const change = (e) => {
    changeLocale(e.target.value);
  };

  return (
    <Flex
      w="100vw"
      justifyContent="center"
      p="1rem"
      // flexDir={{ base: "column", md: "row" }}
      flexDir="column"
      gap="1rem"
      bg="white"
    >
      <Flex gap="0.5rem" justifyContent="center" fontSize="0.75rem">
        <Link href="/about">{t("footerLinkAbout")}</Link>
        <Link href="/blog">{t("footerLinkBlog")}</Link>
        <Link href="/jobs">{t("footerLinkJobs")}</Link>
        <Link href="/help">{t("footerLinkHelp")}</Link>
        <Link href="/api">{t("footerLinkAPI")}</Link>
        <Link href="/privacy">{t("footerLinkPrivacy")}</Link>
        <Link href="/terms">{t("footerLinkTerms")}</Link>
        <Link href="/locations">{t("footerLinkLocations")}</Link>
      </Flex>
      <Flex justifyContent="center" fontSize="0.75rem">
        <Select
          defaultValue={router.locale}
          variant="unstyled"
          fontSize="0.75rem"
          onChange={(e) => change(e)}
          w="max-content"
          cursor="pointer"
        >
          {currentLocale === "en" ? (
            <>
              <option value="en">{t("footerLanguageSelectEn")}</option>
              <option value="ko">{t("footerLanguageSelectKo")}</option>
            </>
          ) : (
            <>
              <option value="en">{t("footerLanguageSelectEn")}</option>
              <option value="ko">{t("footerLanguageSelectKo")}</option>
            </>
          )}
        </Select>
        <Text>© {year} globalTouch</Text>
      </Flex>
    </Flex>
  );
}
