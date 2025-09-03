import {getLocale, getTranslations} from "next-intl/server";

export async function getCheckedLocale() {
  const locale = await getLocale();
  const rtlLocales = ["ar", "he", "fa", "ur"];
  const isRTL = rtlLocales.includes(locale);
  const t = await getTranslations();

  return {
    locale,
    dir: isRTL ? "rtl" : "ltr" as never,
    isRTL,
    t,
  };
}