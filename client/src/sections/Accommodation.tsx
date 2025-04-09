import { SectionTitle } from "../components/SectionTitle";
import { t } from "../i18n";

export function Accommodation() {
  return (
    <div className="content-block">
      <SectionTitle>{t("accommodation.title")}</SectionTitle>
      <p style={{ textAlign: "center" }}>{t("generic.placeholder")}</p>
    </div>
  );
}
