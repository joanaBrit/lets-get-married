import { SectionTitle } from "../components/SectionTitle";
import { t } from "../i18n";

export function Agenda() {
  return (
    <div className="content-block">
      <SectionTitle>{t("agenda.title")}</SectionTitle>
      <p style={{ textAlign: "center" }}>
        Ceremony from around noon. <br></br>
        {t("generic.placeholder")}
      </p>
    </div>
  );
}
