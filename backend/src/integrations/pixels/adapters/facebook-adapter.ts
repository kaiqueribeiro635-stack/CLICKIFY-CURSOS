import { BasePixelAdapter } from './base-pixel-adapter';
import { LeadData, PixelSendResult, TransactionData } from '../types';

type FacebookConfig = {
  pixelId?: string;
  useCapi?: boolean;
  capiAccessToken?: string;
  capiTestEventCode?: string;
};

export class FacebookAdapter extends BasePixelAdapter {
  private fbConfig(): FacebookConfig {
    return (this.config || {}) as FacebookConfig;
  }

  validatePixel(): void {
    const { pixelId, useCapi, capiAccessToken } = this.fbConfig();
    if (!pixelId) throw new Error('Facebook pixelId is required');
    if (useCapi && !capiAccessToken) throw new Error('Facebook capiAccessToken is required when useCapi=true');
  }

  async sendPurchaseEvent(data: TransactionData): Promise<PixelSendResult> {
    const payload = this.formatPayload({ event: 'Purchase', data });
    return { payload, transport: this.fbConfig().useCapi ? 'api' : 'pixel' };
  }

  async sendLeadEvent(data: LeadData): Promise<PixelSendResult> {
    const payload = this.formatPayload({ event: 'Lead', data });
    return { payload, transport: this.fbConfig().useCapi ? 'api' : 'pixel' };
  }

  formatPayload(input: unknown): Record<string, unknown> {
    const { pixelId, capiTestEventCode } = this.fbConfig();
    const { event, data } = (input as { event: string; data: any }) || {};

    const base: Record<string, unknown> = {
      platform: 'facebook',
      pixel_id: pixelId,
      event_name: event,
    };

    if (event === 'Purchase') {
      const tx = data as TransactionData;
      base.custom_data = {
        currency: tx.currency,
        value: tx.value,
        transaction_id: tx.transaction_id,
      };
      base.user_data = {
        email: tx.user_email || null,
        phone: tx.user_phone || null,
      };
    } else {
      const lead = data as LeadData;
      base.user_data = {
        email: lead.user_email || null,
        phone: lead.user_phone || null,
      };
    }

    if (capiTestEventCode) base.test_event_code = capiTestEventCode;

    return base;
  }
}

