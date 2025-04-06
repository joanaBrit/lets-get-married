import { t } from "../i18n";

type DateConfigKeys = "EventStartDate";
type StringConfigKeys = "CoupleName" | "EventLocation" | "NavLinks";
type ConfigKey = StringConfigKeys | DateConfigKeys;

export function getConfig(key: StringConfigKeys): string;
export function getConfig(key: DateConfigKeys): Date;
export function getConfig(key: ConfigKey): string | Date {
  const i18nKey = `config.${key[0].toLowerCase()}${key.slice(1)}`;
  switch (key) {
    case "CoupleName":
    case "EventLocation":
      return t(i18nKey);

    case "EventStartDate":
      return new Date("2025/09/21");

    case "NavLinks":
      return JSON.stringify([
        { labelKey: 1, href: "#our-story" },
        { labelKey: 2, href: "#location" },
        { labelKey: 3, href: "#travel-stay" },
        { labelKey: 4, href: "#faq" },
      ]);
  }
}
