import { useState, useRef } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  LinearProgress,
  Alert,
  Chip,
  IconButton,
} from "@mui/material";
import {
  CloudUpload as UploadIcon,
  PhotoCamera as PhotoIcon,
  Videocam as VideoIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckIcon,
  ExpandMore as ExpandIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface UploadedFile {
  id: string;
  name: string;
  type: "image" | "video";
  size: number;
  url?: string;
  uploadProgress?: number;
  status: "uploading" | "completed" | "error";
}

interface MediaUploadProps {
  userId: string;
  onUploadComplete?: (files: UploadedFile[]) => void;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  uploadEnabled?: boolean;
}

export function MediaUpload({
  userId,
  onUploadComplete,
  maxFiles = 10,
  maxFileSize = 100,
  uploadEnabled = false,
}: MediaUploadProps) {
  const { t } = useTranslation();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Accepted file types
  const acceptedTypes = {
    "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    "video/*": [".mp4", ".mov", ".avi", ".mkv", ".webm"],
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      return t("mediaUpload.errors.fileTooLarge", { maxSize: maxFileSize });
    }

    // Check file type
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      return t("mediaUpload.errors.invalidFileType");
    }

    return null;
  };

  const uploadToR2 = async (file: File, fileId: string) => {
    try {
      // Step 1: Get presigned URL from your backend
      const presignedResponse = await fetch("/api/upload/presigned-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          userId: userId,
        }),
      });

      if (!presignedResponse.ok) {
        throw new Error("Failed to get presigned URL");
      }

      const { presignedUrl, fileKey } = await presignedResponse.json();

      // Step 2: Upload directly to R2 using presigned URL
      const uploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload to R2");
      }

      // Step 3: Notify backend that upload is complete
      const completeResponse = await fetch("/api/upload/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileKey,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          userId: userId,
        }),
      });

      if (!completeResponse.ok) {
        throw new Error("Failed to complete upload");
      }

      const { publicUrl } = await completeResponse.json();

      // Update file status
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileId
            ? {
                ...f,
                status: "completed" as const,
                url: publicUrl,
                uploadProgress: 100,
              }
            : f,
        ),
      );
    } catch (error) {
      console.error("Upload error:", error);
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileId ? { ...f, status: "error" as const } : f,
        ),
      );
    }
  };

  const handleFileSelect = (selectedFiles: FileList) => {
    const newFiles: UploadedFile[] = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      // Validate file
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        continue;
      }

      // Check if we've reached max files
      if (files.length + newFiles.length >= maxFiles) {
        setError(t("mediaUpload.errors.tooManyFiles", { maxFiles }));
        break;
      }

      const fileId = `${Date.now()}-${i}`;
      const uploadFile: UploadedFile = {
        id: fileId,
        name: file.name,
        type: file.type.startsWith("image/") ? "image" : "video",
        size: file.size,
        uploadProgress: 0,
        status: "uploading",
      };

      newFiles.push(uploadFile);

      // Start upload
      uploadToR2(file, fileId);
    }

    setFiles((prev) => [...prev, ...newFiles]);
    setError(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <Accordion
      defaultExpanded
      className={`media-upload ${!uploadEnabled ? "coming-soon" : ""}`}
    >
      <AccordionSummary expandIcon={<ExpandIcon />}>
        <div className="header">
          <h6 className="title">{t("mediaUpload.title")}</h6>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <p className="description">
          {uploadEnabled
            ? t("mediaUpload.description")
            : t("mediaUpload.openSoon")}
        </p>

        {uploadEnabled && (
          <>
            {error && (
              <Alert severity="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            )}

            {/* Upload Area */}
            <div
              className={`upload-area ${isDragging ? "dragging" : ""}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={openFileDialog}
            >
              <UploadIcon className="upload-icon" />
              <p className="upload-text">{t("mediaUpload.dragAndDrop")}</p>
              <Button variant="outlined" startIcon={<UploadIcon />}>
                {t("mediaUpload.selectFiles")}
              </Button>
              <p className="upload-hint">
                {t("mediaUpload.supportedFormats")} •{" "}
                {t("mediaUpload.maxSize", { maxSize: maxFileSize })}
              </p>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              style={{ display: "none" }}
              onChange={(e) =>
                e.target.files && handleFileSelect(e.target.files)
              }
            />

            {/* File List */}
            {files.length > 0 && (
              <div className="file-list">
                <h6 className="file-list-title">
                  {t("mediaUpload.uploadedFiles")}
                </h6>
                {files.map((file) => (
                  <div key={file.id} className="file-item">
                    <div className="file-info">
                      <div className="file-icon">
                        {file.type === "image" ? <PhotoIcon /> : <VideoIcon />}
                      </div>
                      <div className="file-details">
                        <span className="file-name">{file.name}</span>
                        <span className="file-size">
                          {formatFileSize(file.size)}
                        </span>
                      </div>
                    </div>

                    <div className="file-status">
                      {file.status === "uploading" && (
                        <LinearProgress variant="indeterminate" />
                      )}
                      {file.status === "completed" && (
                        <Chip
                          icon={<CheckIcon />}
                          label={t("mediaUpload.completed")}
                          color="success"
                          size="small"
                        />
                      )}
                      {file.status === "error" && (
                        <Chip
                          label={t("mediaUpload.error")}
                          color="error"
                          size="small"
                        />
                      )}
                      <IconButton
                        size="small"
                        onClick={() => removeFile(file.id)}
                        disabled={file.status === "uploading"}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
