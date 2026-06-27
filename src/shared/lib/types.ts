export interface FileAttachment {
  name: string;
  data: string;
  mimeType: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  category: string;
  message: string;
  attachment?: FileAttachment;
  attachments?: FileAttachment[];
  uninstall?: {
    rating: number;
    reasons: string[];
    whatWentWrong: string;
    howToImprove: string;
  };
}

export interface Entry {
  count: number;
  resetAt: number;
}
