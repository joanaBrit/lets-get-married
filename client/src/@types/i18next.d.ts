import { en } from "./i18n/en";
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "default";
    resources: typeof en;
  }
}
