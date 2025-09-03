"use client"

import {useLocale} from "next-intl";
import {useTranslations} from "use-intl";

export function useCheckedLocale() {
  const locale = useLocale();
  const rtlLocales = ["ar", "he", "fa", "ur"];
  const isRTL = rtlLocales.includes(locale);
  const t = useTranslations();

  return {
    locale,
    dir: isRTL ? "rtl" : "ltr" as never,
    isRTL,
    t,
  };
}