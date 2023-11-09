import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

interface IUseFormatCurrency {
  amount: number;
}

const KRW_EXCHANGE_LATE = 1300;

export const useAmountToFormatCurrency = ({ amount }) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <>
      {t("currency")}
      {(
        (router.locale === "en" ? 1 : KRW_EXCHANGE_LATE) * amount
      ).toLocaleString()}
    </>
  );
};
