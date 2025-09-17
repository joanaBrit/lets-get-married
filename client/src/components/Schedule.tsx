import { useTranslation } from "react-i18next";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import {
  ExpandMore as ExpandIcon,
  AccessTime as TimeIcon,
} from "@mui/icons-material";

interface ScheduleItem {
  time: string;
  name: string;
}

export function Schedule() {
  const { t } = useTranslation();

  // Get schedule items from i18n as array
  const scheduleItems = t("schedule.items", {
    returnObjects: true,
  }) as ScheduleItem[];

  // Don't render if no schedule items
  if (!scheduleItems || scheduleItems.length === 0) {
    return null;
  }

  return (
    <Accordion defaultExpanded className="accordion-card schedule">
      <AccordionSummary expandIcon={<ExpandIcon />}>
        <h6 className="title">{t("schedule.title")}</h6>
      </AccordionSummary>
      <AccordionDetails>
        <div className="schedule-content">
          <div className="schedule-timeline">
            {scheduleItems.map((item, index) => (
              <div key={index} className="schedule-item">
                <div className="timeline-dot">
                  <TimeIcon className="time-icon" />
                </div>
                <div className="schedule-time">{item.time}</div>
                <div className="schedule-name">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
