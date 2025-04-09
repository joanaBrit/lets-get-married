import { t } from "i18next";
import { SectionTitle } from "../components/SectionTitle";
import { Trans } from "react-i18next";

import { FlightLandOutlined, DirectionsCarOutlined } from "@mui/icons-material";
import { SubsectionTitle } from "../components/SubsectionTitle";

export function Travel() {
  return (
    <div className="content-block">
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
