import { Card } from "@mui/material";
import { useTranslation } from "react-i18next";

export function LiveAnnouncement() {
  const { t } = useTranslation();
  
  return (
    <Card className="live-announcement">
      <h6 className="title">
        {t('guestArea.liveAnnouncements.title')}
      </h6>
      <p className="description">
        {t('guestArea.liveAnnouncements.description')}
      </p>
    </Card>
  );
}
