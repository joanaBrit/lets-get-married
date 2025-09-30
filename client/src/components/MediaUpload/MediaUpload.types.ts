export interface UploadedFile {
  id: string;
  name: string;
  type: "image" | "video";
  size: number;
  file: File;
  url?: string;
  uploadProgress?: number;
  status: "selected" | "uploading" | "completed" | "error";
  thumbnailUrl?: string;
}
