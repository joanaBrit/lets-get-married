import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore as ExpandIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

interface MysteryGameProps {
  pk?: string;
}

export function MysteryGame({ pk }: MysteryGameProps) {
  const { t } = useTranslation();
  const [storyData, setStoryData] = useState<string | null>(null);

  useEffect(() => {
    if (!pk) {
      return;
    }

    const fetchStoryData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_RSVP_ENDPOINT}/story?pk=${pk}`
        );

        if (!response.ok) {
          // If request fails, keep showing mystery game
          return;
        }

        const data = await response.json();
        
        // Check if data.value exists and is a string
        if (data?.value && typeof data.value === 'string') {
          setStoryData(data.value);
        }
      } catch (error) {
        // If there's an error, keep showing mystery game
        console.warn('Failed to fetch story data:', error);
      }
    };

    fetchStoryData();
  }, [pk]);

  return (
    <Accordion defaultExpanded className="accordion-card mystery-game">
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
        {storyData ? (
          <p className="description story-content">
            {storyData}
          </p>
        ) : (
          <p className="description">{t("guestArea.mysteryGame.description")}</p>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

interface LiveAnnouncementProps {
  pk?: string;
}

export function LiveAnnouncement({ pk }: LiveAnnouncementProps) {
  return <MysteryGame pk={pk} />;
}
