import { Button } from "@mui/material";
import {
  CloudUpload as UploadIcon,
  Lock as LockIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { ThumbnailItem } from "./ThumbnailItem";
import { UploadedFile } from "./MediaUpload.types";

interface ThumbnailGridProps {
  files: UploadedFile[];
  isUploading: boolean;
  onUploadAll: (isPrivate: boolean) => void;
  onRemoveFile: (fileId: string) => void;
  formatFileSize: (bytes: number) => string;
  truncateFileName: (name: string, maxLength?: number) => string;
}

export function ThumbnailGrid({
  files,
  isUploading,
  onUploadAll,
  onRemoveFile,
  formatFileSize,
  truncateFileName,
}: ThumbnailGridProps) {
  const { t } = useTranslation();
  const hasSelectedFiles = files.some((f) => f.status === "selected");

  return (
    <div className="file-thumbnails">
      <div className="thumbnails-header">
        <h6 className="file-list-title">
          {t("mediaUpload.selectedFiles")} ({files.length})
        </h6>
        {hasSelectedFiles && (
          <div className="upload-buttons">
            <Button
              variant="contained"
              color="primary"
              onClick={() => onUploadAll(false)}
              disabled={isUploading}
              startIcon={<UploadIcon />}
            >
              {isUploading
                ? t("mediaUpload.uploading")
                : t("mediaUpload.shareWithEveryone")}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => onUploadAll(true)}
              disabled={isUploading}
              startIcon={<LockIcon />}
            >
              {isUploading
                ? t("mediaUpload.uploading")
                : t("mediaUpload.sharePrivate")}
            </Button>
          </div>
        )}
      </div>

      <div className="thumbnails-grid">
        {files.map((file) => (
          <ThumbnailItem
            key={file.id}
            file={file}
            onRemove={onRemoveFile}
            formatFileSize={formatFileSize}
            truncateFileName={truncateFileName}
          />
        ))}
      </div>
    </div>
  );
}
