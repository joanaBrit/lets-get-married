import { useTranslation } from "react-i18next";
import { SectionTitle } from "../components/SectionTitle";

export function Accommodation() {
  const { t } = useTranslation();
  return (
    <div className="content-block">
      <SectionTitle>{t("accommodation.title")}</SectionTitle>
      <p style={{ textAlign: "center" }}>{t("generic.placeholder")}</p>
    </div>
  );
}
