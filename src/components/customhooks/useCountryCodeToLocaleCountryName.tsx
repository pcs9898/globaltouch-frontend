import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

interface IUseCountryNameByLocale {
  country_code?: string;
}

export const useCountryCodeToLocaleCountryName = ({
  country_code,
}: IUseCountryNameByLocale): string => {
  const { i18n } = useTranslation();
  if (!country_code) {
    return null;
  }

  const countriesInfo = require("/public/countriesInfo.json");

  return i18n.language === "en"
    ? countriesInfo[country_code].engName
    : countriesInfo[country_code].korName;
};
