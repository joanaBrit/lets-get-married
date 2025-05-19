import { Trans, useTranslation } from "react-i18next";
import { SectionTitle } from "../components/SectionTitle";
import { PropertyCard } from "../components/PropertyCard";

import {
  Login as LoginIcon,
  Logout as LogoutIcon,
  BedOutlined,
  SellOutlined,
} from "@mui/icons-material";
import "./Accommodation.scss";

export function Accommodation() {
  const { t } = useTranslation();

  const PROPERTIES = [
    {
      cardProps: {
        imgSrc: "/assets/penthouse-station.avif",
        title: "Penthouse Station",
        address: "Via Bastioni Carlo V, 14, Brindisi",
        link: "https://www.airbnb.co.uk/rooms/1351263982656563486",
      },
      key: "accommodation.penthouse",
    },
    {
      cardProps: {
        imgSrc: "/assets/villa de bonis.avif",
        title: "Villa De Bonis",
        address: "ex SS 476 Km 3, 73016 San Cesario di Lecce LE, Lecce",
        link: "https://www.airbnb.co.uk/rooms/3483328",
      },
      key: "accommodation.bonis",
    },
    {
      cardProps: {
        imgSrc: "/assets/barone.jpeg",
        title: "Casa del Barone",
        address: "Via Santa Maria dei Veterani, 16, Lecce",
        link: "https://www.airbnb.co.uk/rooms/42210416",
      },
      key: "accommodation.barone",
    },
  ];
  return (
    <div className="content-block">
      <SectionTitle>{t("accommodation.title")}</SectionTitle>

      <Trans i18nKey={"accommodation.content"} />

      <div style={{ padding: "2rem 0 0" }}>
        {PROPERTIES.map(({ cardProps, key }) => (
          <PropertyCard key={key} {...cardProps}>
            <PropertyDetails propKey={key} />
          </PropertyCard>
        ))}
      </div>
    </div>
  );
}

function PropertyDetails(props: { propKey: string }) {
  const { t } = useTranslation();
  const key = props.propKey;
  const fromDate = new Date(t(`${key}.dateFrom`));
  const toDate = new Date(t(`${key}.dateTo`));

  return (
    <div className="property-details">
      <BedOutlined />
      {t(`${key}.features`)}
      <span style={{ gridColumn: "1 / 3" }}>{t(`${key}.content`)}</span>
      <LoginIcon />
      <span>
        {t("stay.checkIn")}:{" "}
        <span className="date">{fromDate.toLocaleDateString()}</span>
      </span>
      <LogoutIcon />
      <span>
        {t("stay.checkOut")}:
        <span className="date">{toDate.toLocaleDateString()}</span>
      </span>

      <SellOutlined />
      {t(`${key}.pricing`)}
    </div>
  );
}
