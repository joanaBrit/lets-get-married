import { Trans, useTranslation } from "react-i18next";
import { StyledButton } from "../components/StyledButton";
import { Card, IconButton, Typography } from "@mui/material";
import {
  OpenInNewOutlined as OpenIcon,
  LocalParkingOutlined as ParkingIcon,
  AirportShuttleOutlined as BusIcon,
  PlaceOutlined as PlaceIcon,
} from "@mui/icons-material";

import "./Venue.scss";
import { SectionTitle } from "../components/SectionTitle";

export function Venue() {
  const { t } = useTranslation();
  return (
    <div className="content-block venue-container" id="location">
      <SectionTitle>{t("venue.title")}</SectionTitle>
      <div>
        <div>
          <Card style={{ maxWidth: 600, margin: "auto" }}>
            <div className="image-container">
              <img src="/assets/tenuca-tresca.jpg" />
            </div>

            <div className="content">
              <IconButton
                size="large"
                onClick={() => window.open(t("venue.mapUrl"))}
              >
                <OpenIcon />
              </IconButton>
              <h2>{t("venue.name")}</h2>
              <div className="address">
                <PlaceIcon />
                <span>{t("venue.address")}</span>
              </div>
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
            </div>
          </Card>
        </div>
        <div>
          <p className="description">
            <Trans>{t("venue.description")}</Trans>
          </p>

          <StyledButton variant="contained" size="large">
            {t("venue.readMore")}
          </StyledButton>
        </div>
      </div>
    </div>
  );
}
