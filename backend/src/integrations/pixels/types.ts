export type PixelPlatform = 'facebook' | 'google_ads' | 'google_analytics' | 'tiktok' | 'kwai' | 'pinterest';

export type PixelEventType = 'purchase' | 'lead' | 'begin_checkout';

export type PixelEventStatus = 'success' | 'error';

export interface TransactionData {
  value: number;
  currency: string;
  transaction_id: string;
  user_email?: string;
  user_phone?: string;
}

export interface LeadData {
  user_email?: string;
  user_phone?: string;
}

export type PixelConfig = Record<string, unknown>;

export interface PixelSendResult {
  payload: Record<string, unknown>;
  transport?: 'pixel' | 'gtag' | 'api' | 'unknown';
}

