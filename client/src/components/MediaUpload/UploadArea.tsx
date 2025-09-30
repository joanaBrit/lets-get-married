import { Button } from "@mui/material";
import { CloudUpload as UploadIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface UploadAreaProps {
  isDragging: boolean;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onClick: () => void;
  hasFiles: boolean;
  maxFileSize: number;
}

export function UploadArea({
  isDragging,
  onDrop,
  onDragOver,
  onDragLeave,
  onClick,
  hasFiles,
  maxFileSize,
}: UploadAreaProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`upload-area ${isDragging ? "dragging" : ""}`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={onClick}
    >
      <UploadIcon className="upload-icon" />
      <p className="upload-text desktop-only">{t("mediaUpload.dragAndDrop")}</p>
      <Button variant="outlined" startIcon={<UploadIcon />}>
        {hasFiles
          ? t("mediaUpload.selectMoreFiles")
          : t("mediaUpload.selectFiles")}
      </Button>
      <p className="upload-hint">
        {t("mediaUpload.maxSize", { maxSize: maxFileSize })}
      </p>
    </div>
  );
}
