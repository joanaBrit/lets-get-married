import { IconButton, LinearProgress, Chip } from "@mui/material";
import {
  PhotoCamera as PhotoIcon,
  Videocam as VideoIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { UploadedFile } from "./MediaUpload.types";

interface ThumbnailItemProps {
  file: UploadedFile;
  onRemove: (fileId: string) => void;
  formatFileSize: (bytes: number) => string;
  truncateFileName: (name: string, maxLength?: number) => string;
}

export function ThumbnailItem({
  file,
  onRemove,
  formatFileSize,
  truncateFileName,
}: ThumbnailItemProps) {
  return (
    <div className={`thumbnail-item ${file.status}`}>
      <div className="thumbnail-container">
        {file.thumbnailUrl ? (
          <img
            src={file.thumbnailUrl}
            alt={file.name}
            className="thumbnail-image"
          />
        ) : (
          <div className="thumbnail-placeholder">
            {file.type === "image" ? <PhotoIcon /> : <VideoIcon />}
          </div>
        )}

        <StatusOverlay status={file.status} />
        <IconButton
          className="remove-button"
          size="small"
          onClick={() => onRemove(file.id)}
          disabled={file.status === "uploading"}
        >
          <DeleteIcon />
        </IconButton>
      </div>

      <div className="thumbnail-info">
        <span className="file-name" title={file.name}>
          {truncateFileName(file.name)}
        </span>
        <span className="file-size">{formatFileSize(file.size)}</span>
      </div>
    </div>
  );
}

function StatusOverlay({
  status,
}: {
  status: "uploading" | "completed" | "error" | "selected";
}) {
  const { t } = useTranslation();
  return (
    <div className="thumbnail-overlay">
      {status === "uploading" && (
        <div className="upload-progress">
          <LinearProgress variant="indeterminate" />
        </div>
      )}
      {status === "completed" && (
        <div className="upload-success">
          <CheckIcon className="success-icon" />
        </div>
      )}
      {status === "error" && (
        <div className="upload-error">
          <Chip label={t("mediaUpload.error")} color="error" size="small" />
        </div>
      )}
    </div>
  );
}
