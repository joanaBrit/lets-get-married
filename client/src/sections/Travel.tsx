import { SectionTitle } from "../components/SectionTitle";
import { Trans, useTranslation } from "react-i18next";

import { FlightLandOutlined, DirectionsCarOutlined } from "@mui/icons-material";
import { SubsectionTitle } from "../components/SubsectionTitle";

export function Travel() {
  const { t } = useTranslation();
  return (
    <div className="content-block" id="travel">
      <SectionTitle>{t("travel.title")}</SectionTitle>
      <SubsectionTitle
        icon={FlightLandOutlined}
        text={t("travel.gettingIn.title")}
      />
      <p>
        <Trans>{t("travel.gettingIn.content")}</Trans>
      </p>
      <SubsectionTitle
        icon={DirectionsCarOutlined}
        text={t("travel.gettingAround.title")}
      />
      <p>
        <Trans>{t("travel.gettingAround.content")}</Trans>
      </p>
    </div>
  );
}
