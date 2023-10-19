import moment from "moment";
import { useTranslation } from "next-i18next";

interface IUseFormatTimeAgo {
  timestamp: string;
}

export default function useFormatTimeAgo({
  timestamp,
}: IUseFormatTimeAgo): string {
  const { t } = useTranslation();
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  if (diff < 60000) {
    return t("formatTimeNow");
  } else if (diff < 3600000) {
    return `${Math.floor(diff / 60000)}${t("formatTimeMinutes")}`;
  } else if (diff < 86400000) {
    return `${Math.floor(diff / 3600000)}${t("formatTimeHours")}`;
  } else if (diff < 2592000000) {
    return `${Math.floor(diff / 86400000)}${t("formatTimeDays")}`;
  } else if (diff < 31536000000) {
    const months = Math.floor(diff / 2592000000);
    return `${months}${
      months > 1 ? t("formatTimeMonths1") : t("formatTimeMonths2")
    }`;
  } else {
    return moment(date).format("YYYY-MM-DD");
  }
}
