import { useState, useRef, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
} from "@mui/material";
import { ExpandMore as ExpandIcon } from "@mui/icons-material";
import { Trans, useTranslation } from "react-i18next";
import { UploadArea } from "./UploadArea";
import { UploadProgress } from "./UploadProgress";
import { ThumbnailGrid } from "./ThumbnailGrid";
import { UploadedFile } from "./MediaUpload.types";
import "./MediaUpload.scss";

interface MediaUploadProps {
  userPk: string;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  uploadEnabled?: boolean;
}

// Constants
const DEFAULT_MAX_FILES = 10;
const DEFAULT_MAX_FILE_SIZE = 500; // MB
const BATCH_SIZE = 5;
const AUTO_REMOVE_DELAY = 5000; // ms

// Helper functions
const isImageFile = (file: File): boolean => file.type.startsWith("image/");
const getFileType = (file: File): "image" | "video" =>
  isImageFile(file) ? "image" : "video";
const truncateFileName = (name: string, maxLength: number = 20): string =>
  name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;

export function MediaUpload({
  userPk,
  maxFiles = DEFAULT_MAX_FILES,
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  uploadEnabled = false,
}: MediaUploadProps) {
  const { t } = useTranslation();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const createThumbnail = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (isImageFile(file)) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      } else {
        // For videos and other files, don't create thumbnails
        reject(new Error("No thumbnail needed for this file type"));
      }
    });
  };

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      return t("mediaUpload.errors.fileTooLarge", { maxSize: maxFileSize });
    }

    // No file type restrictions - accept all files
    return null;
  };

  const uploadMedia = async (
    file: File,
    fileId: string,
    isPrivate: boolean = false
  ) => {
    try {
      const params = new URLSearchParams();
      params.append("pk", userPk);
      params.append("filename", file.name);
      isPrivate && params.append("private", "true");

      const uploadUrl = `${import.meta.env.VITE_RSVP_ENDPOINT}/mediaUpload?${params.toString()}`;

      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(`Upload failed: ${errorText}`);
      }

      const result = await uploadResponse.json();

      // Update file status
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileId
            ? {
                ...f,
                status: "completed" as const,
                url: result.objectKey,
                uploadProgress: 100,
              }
            : f
        )
      );
    } catch (error) {
      console.error("Upload error:", error);
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileId ? { ...f, status: "error" as const } : f
        )
      );
    }
  };

  const handleFileSelect = async (selectedFiles: FileList) => {
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

      try {
        const thumbnailUrl = await createThumbnail(file);
        const uploadFile: UploadedFile = {
          id: fileId,
          name: file.name,
          type: getFileType(file),
          size: file.size,
          file: file,
          uploadProgress: 0,
          status: "selected",
          thumbnailUrl,
        };

        newFiles.push(uploadFile);
      } catch (error) {
        console.error("Failed to create thumbnail:", error);
        // Still add the file without thumbnail
        const uploadFile: UploadedFile = {
          id: fileId,
          name: file.name,
          type: getFileType(file),
          size: file.size,
          file: file,
          uploadProgress: 0,
          status: "selected",
        };

        newFiles.push(uploadFile);
      }
    }

    setFiles((prev) => [...prev, ...newFiles]);
    setError(null);
  };

  const handleUploadAll = async (isPrivate: boolean = false) => {
    const filesToUpload = files.filter((f) => f.status === "selected");
    if (filesToUpload.length === 0) return;

    setIsUploading(true);
    setShowSuccessBanner(false);

    // Update all selected files to uploading status
    setFiles((prev) =>
      prev.map((f) =>
        f.status === "selected" ? { ...f, status: "uploading" as const } : f
      )
    );

    for (let i = 0; i < filesToUpload.length; i += BATCH_SIZE) {
      const batch = filesToUpload.slice(i, i + BATCH_SIZE);
      const batchPromises = batch.map((uploadFile) =>
        uploadMedia(uploadFile.file, uploadFile.id, isPrivate)
      );

      // Wait for current batch to complete before starting next batch
      await Promise.allSettled(batchPromises);
    }

    setIsUploading(false);
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

  // Watch files state to handle success banner and auto-cleanup
  useEffect(() => {
    if (!isUploading && files.length > 0) {
      const allCompleted = files.every(
        (f) => f.status === "completed" || f.status === "error"
      );
      const hasSuccessful = files.some((f) => f.status === "completed");

      if (allCompleted && hasSuccessful) {
        setShowSuccessBanner(true);

        // Remove successfully uploaded files after 5 seconds
        const timeoutId = setTimeout(() => {
          setFiles((prev) => prev.filter((f) => f.status !== "completed"));
        }, AUTO_REMOVE_DELAY);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [files, isUploading]);

  return (
    <Accordion
      defaultExpanded
      className={`accordion-card media-upload ${!uploadEnabled ? "coming-soon" : ""}`}
    >
      <AccordionSummary expandIcon={<ExpandIcon />}>
        <div className="header">
          <h6 className="title">{t("mediaUpload.title")}</h6>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="media-upload-content">
          <p className="description">
            {uploadEnabled ? (
              <Trans i18nKey="mediaUpload.description" />
            ) : (
              <Trans i18nKey="mediaUpload.openSoon" />
            )}
          </p>

          {uploadEnabled && (
            <>
              {error && (
                <Alert severity="error" onClose={() => setError(null)}>
                  {error}
                </Alert>
              )}

              {showSuccessBanner && (
                <Alert
                  severity="success"
                  onClose={() => setShowSuccessBanner(false)}
                >
                  {t("mediaUpload.uploadSuccess")}
                </Alert>
              )}

              {/* Upload Area or Progress */}
              {isUploading ? (
                <UploadProgress
                  completed={
                    files.filter((f) => f.status === "completed").length
                  }
                  total={files.length}
                />
              ) : (
                <UploadArea
                  isDragging={isDragging}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={openFileDialog}
                  hasFiles={files.length > 0}
                  maxFileSize={maxFileSize}
                />
              )}

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                style={{ display: "none" }}
                onChange={(e) =>
                  e.target.files && handleFileSelect(e.target.files)
                }
              />

              {/* File Thumbnails */}
              {files.length > 0 && (
                <ThumbnailGrid
                  files={files}
                  isUploading={isUploading}
                  onUploadAll={handleUploadAll}
                  onRemoveFile={removeFile}
                  formatFileSize={formatFileSize}
                  truncateFileName={truncateFileName}
                />
              )}
            </>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
