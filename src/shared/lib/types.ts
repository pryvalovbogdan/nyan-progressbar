export interface ContactPayload {
  name: string;
  email: string;
  category: string;
  message: string;
  attachment?: {
    name: string;
    data: string;
    mimeType: string;
  };
  uninstall?: {
    rating: number;
    reasons: string[];
    whatWentWrong: string;
    howToImprove: string;
    anonymous: boolean;
  };
}

export interface Entry {
  count: number;
  resetAt: number;
}
