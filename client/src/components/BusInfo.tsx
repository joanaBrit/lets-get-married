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
      className={`transport-info ${isOnBus ? "bus" : "car"}`}
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
        <p className="description">
          <Trans
            i18nKey={
              isOnBus
                ? "guestArea.transportInfo.busDescription"
                : "guestArea.transportInfo.carDescription"
            }
          />
        </p>
      </AccordionDetails>
    </Accordion>
  );
}

// Keep the old BusInfo export for backward compatibility
export function BusInfo() {
  return <TransportInfo isOnBus={true} />;
}
