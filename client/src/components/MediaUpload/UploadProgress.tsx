import { LinearProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

interface UploadProgressProps {
  completed: number;
  total: number;
}

export function UploadProgress({ completed, total }: UploadProgressProps) {
  const { t } = useTranslation();
  const progressPercentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="upload-progress-container">
      <div className="progress-info">
        <p className="progress-text">
          {t("mediaUpload.uploadingProgress", {
            completed,
            total,
          })}
        </p>
        <LinearProgress
          variant="determinate"
          value={progressPercentage}
          sx={{ marginTop: 1 }}
        />
      </div>
    </div>
  );
}
