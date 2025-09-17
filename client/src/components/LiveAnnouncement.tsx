import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import {
  ExpandMore as ExpandIcon,
  Person as DetectiveIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export function MysteryGame() {
  const { t } = useTranslation();

  return (
    <Accordion defaultExpanded className="mystery-game">
      <AccordionSummary expandIcon={<ExpandIcon />}>
        <div className="header">
          <span style={{ fontSize: 32 }}>🕵️</span>
          <div className="title-section">
            <h6 className="title">{t("guestArea.mysteryGame.title")}</h6>
            <span className="subtitle">
              {t("guestArea.mysteryGame.subtitle")}
            </span>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <p className="description">{t("guestArea.mysteryGame.description")}</p>
      </AccordionDetails>
    </Accordion>
  );
}

// Keep the old export for backward compatibility
export function LiveAnnouncement() {
  return <MysteryGame />;
}
