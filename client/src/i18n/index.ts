import i18n from "i18next";
import { en } from "./en";
import { initReactI18next } from "react-i18next";

export const resources = {
  en: { default: en },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  ns: ["default"],
  interpolation: { escapeValue: false },
});

export default i18n;
export const t = i18n.t;
