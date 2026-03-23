import { BasePixelAdapter } from './base-pixel-adapter';
import { LeadData, PixelSendResult, TransactionData } from '../types';

type TikTokConfig = {
  pixelId?: string;
  accessToken?: string;
  useApi?: boolean;
};

export class TikTokAdapter extends BasePixelAdapter {
  private ttConfig(): TikTokConfig {
    return (this.config || {}) as TikTokConfig;
  }

  validatePixel(): void {
    const { pixelId, useApi, accessToken } = this.ttConfig();
    if (!pixelId) throw new Error('TikTok pixelId is required');
    if (useApi && !accessToken) throw new Error('TikTok accessToken is required when useApi=true');
  }

  async sendPurchaseEvent(data: TransactionData): Promise<PixelSendResult> {
    const payload = this.formatPayload({ event: 'CompletePayment', data });
    return { payload, transport: this.ttConfig().useApi ? 'api' : 'pixel' };
  }

  async sendLeadEvent(data: LeadData): Promise<PixelSendResult> {
    const payload = this.formatPayload({ event: 'SubmitForm', data });
    return { payload, transport: this.ttConfig().useApi ? 'api' : 'pixel' };
  }

  formatPayload(input: unknown): Record<string, unknown> {
    const { pixelId } = this.ttConfig();
    const { event, data } = (input as { event: string; data: any }) || {};

    const base: Record<string, unknown> = {
      platform: 'tiktok',
      pixel_id: pixelId,
      event_name: event,
    };

    if (event === 'CompletePayment') {
      const tx = data as TransactionData;
      base.properties = {
        currency: tx.currency,
        value: tx.value,
        order_id: tx.transaction_id,
      };
      base.user = {
        email: tx.user_email || null,
        phone: tx.user_phone || null,
      };
    } else {
      const lead = data as LeadData;
      base.user = {
        email: lead.user_email || null,
        phone: lead.user_phone || null,
      };
    }

    return base;
  }
}

