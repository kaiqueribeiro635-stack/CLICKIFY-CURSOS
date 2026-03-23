import { BasePixelAdapter } from './base-pixel-adapter';
import { LeadData, PixelSendResult, TransactionData } from '../types';

type GoogleAdsConfig = {
  conversionId?: string;
  conversionLabel?: string;
  useApi?: boolean;
};

export class GoogleAdsAdapter extends BasePixelAdapter {
  private gaConfig(): GoogleAdsConfig {
    return (this.config || {}) as GoogleAdsConfig;
  }

  validatePixel(): void {
    const { conversionId, conversionLabel } = this.gaConfig();
    if (!conversionId) throw new Error('Google Ads conversionId is required');
    if (!conversionLabel) throw new Error('Google Ads conversionLabel is required');
  }

  async sendPurchaseEvent(data: TransactionData): Promise<PixelSendResult> {
    const payload = this.formatPayload({ event: 'conversion', data });
    return { payload, transport: this.gaConfig().useApi ? 'api' : 'gtag' };
  }

  async sendLeadEvent(data: LeadData): Promise<PixelSendResult> {
    const payload = this.formatPayload({ event: 'conversion', data });
    return { payload, transport: this.gaConfig().useApi ? 'api' : 'gtag' };
  }

  formatPayload(input: unknown): Record<string, unknown> {
    const { conversionId, conversionLabel } = this.gaConfig();
    const { event, data } = (input as { event: string; data: any }) || {};

    const base: Record<string, unknown> = {
      platform: 'google_ads',
      event_type: event,
      send_to: `${conversionId}/${conversionLabel}`,
    };

    if (data && typeof (data as TransactionData).value === 'number') {
      const tx = data as TransactionData;
      base.value = tx.value;
      base.currency = tx.currency;
      base.transaction_id = tx.transaction_id;
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

