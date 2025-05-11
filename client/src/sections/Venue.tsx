import { Trans, useTranslation } from "react-i18next";
import { StyledButton } from "../components/StyledButton";
import { Typography } from "@mui/material";
import {
  LocalParkingOutlined as ParkingIcon,
  AirportShuttleOutlined as BusIcon,
} from "@mui/icons-material";

import "./Venue.scss";
import { SectionTitle } from "../components/SectionTitle";
import { PropertyCard } from "../components/PropertyCard";

export function Venue() {
  const { t } = useTranslation();
  return (
    <div className="content-block venue-container" id="location">
      <SectionTitle>{t("venue.title")}</SectionTitle>
      <div className="venue-content">
        <PropertyCard
          imgSrc="/assets/tenuca-tresca.jpg"
          link={t("venue.mapUrl")}
          title={t("venue.name")}
          address={t("venue.address")}
        >
          <ul>
            <li>
              <BusIcon />
              <Typography>{t("venue.shuttle")}</Typography>
            </li>
            <li>
              <ParkingIcon />
              <Typography>{t("venue.parking")}</Typography>
            </li>
          </ul>
        </PropertyCard>

        <div>
          <p className="description">
            <Trans>{t("venue.description")}</Trans>
          </p>

          {false && (
            <StyledButton variant="contained" size="large">
              {t("venue.readMore")}
            </StyledButton>
          )}
        </div>
      </div>
    </div>
  );
}
