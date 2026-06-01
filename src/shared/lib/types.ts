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
}

export interface Entry {
  count: number;
  resetAt: number;
}
