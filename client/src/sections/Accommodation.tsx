import { Trans, useTranslation } from "react-i18next";
import { SectionTitle } from "../components/SectionTitle";

import "./Accommodation.scss";

export function Accommodation() {
  const { t } = useTranslation();

  return (
    <div className="content-block">
      <SectionTitle>{t("accommodation.title")}</SectionTitle>

      <Trans i18nKey={"accommodation.content"} />
    </div>
  );
}
