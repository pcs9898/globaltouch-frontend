import { useTranslation } from "next-i18next";

interface IUseFormatCurrency {
  amount: number;
}
export const useAmountToFormatCurrency = ({ amount }) => {
  const { t } = useTranslation();

  return (
    <>
      {t("currency")}
      {amount.toLocaleString()}
    </>
  );
};
