import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useChangeLocale = () => {
  const router = useRouter();

  const changeLocale = (locale) => {
    Cookies.set("locale", locale);
    router.push(router.pathname, router.asPath, { locale });
  };

  return changeLocale;
};
