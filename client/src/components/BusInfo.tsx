import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import {
  DirectionsBus as BusIcon,
  DirectionsCar as CarIcon,
  ExpandMore as ExpandIcon,
} from "@mui/icons-material";
import { useTranslation, Trans } from "react-i18next";

interface TransportInfoProps {
  isOnBus: boolean;
}

export function TransportInfo({ isOnBus }: TransportInfoProps) {
  const { t } = useTranslation();

  return (
    <Accordion
      defaultExpanded
      className={`accordion-card transport-info ${isOnBus ? "bus" : "car"}`}
    >
      <AccordionSummary expandIcon={<ExpandIcon />}>
        <div className="header">
          {isOnBus ? (
            <BusIcon className="icon" />
          ) : (
            <CarIcon className="icon" />
          )}
          <h6 className="title">
            {isOnBus
              ? t("guestArea.transportInfo.busTitle")
              : t("guestArea.transportInfo.carTitle")}
          </h6>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="transport-content">
          <p className="description">
            <Trans
              i18nKey={
                isOnBus
                  ? "guestArea.transportInfo.busDescription"
                  : "guestArea.transportInfo.carDescription"
              }
            />
          </p>

          {isOnBus && (
            <div className="map-container">
              <iframe
                src={t("guestArea.transportInfo.busMapEmbedUrl")}
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "var(--radius-md)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bus pickup location - Viale Gallipoli, Lecce"
              />
            </div>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

// Keep the old BusInfo export for backward compatibility
export function BusInfo() {
  return <TransportInfo isOnBus={true} />;
}
