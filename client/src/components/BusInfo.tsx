import { Card } from "@mui/material";
import { DirectionsBus as BusIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export function BusInfo() {
  const { t } = useTranslation();
  
  return (
    <Card className="bus-info">
      <div className="header">
        <BusIcon className="icon" />
        <h6 className="title">
          {t('guestArea.busInfo.title')}
        </h6>
      </div>
      <p className="description">
        {t('guestArea.busInfo.description')}
      </p>
    </Card>
  );
}
