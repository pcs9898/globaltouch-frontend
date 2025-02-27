import moment from "moment";
import { useTranslation } from "next-i18next";

interface IUseFormatTimeAgo {
  timestamp: string;
}

export const useFormatTimeAgoVer2 = ({ timestamp }: IUseFormatTimeAgo) => {
  const { t } = useTranslation();
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  let returnItem;

  if (diff < 60000) {
    returnItem = t("formatTimeNow");
  } else if (diff < 3600000) {
    returnItem = `${Math.floor(diff / 60000)}${t("formatTimeMinutes")}`;
  } else if (diff < 86400000) {
    returnItem = `${Math.floor(diff / 3600000)}${t("formatTimeHours")}`;
  } else if (diff < 2592000000) {
    returnItem = `${Math.floor(diff / 86400000)}${t("formatTimeDays")}`;
  } else if (diff < 31536000000) {
    const months = Math.floor(diff / 2592000000);
    returnItem = `${months}${
      months > 1 ? t("formatTimeMonths1") : t("formatTimeMonths2")
    }`;
  } else {
    returnItem = moment(date).format("YYYY-MM-DD");
  }

  return <>{returnItem}</>;
};
