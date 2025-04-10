import { useTranslation } from "react-i18next";
import { SectionTitle } from "../components/SectionTitle";

export function Agenda() {
  const { t } = useTranslation();
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
