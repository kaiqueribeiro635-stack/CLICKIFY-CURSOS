import { BasePixelAdapter } from './base-pixel-adapter';
import { LeadData, PixelSendResult, TransactionData } from '../types';

type GoogleAnalyticsConfig = {
  measurementId?: string;
  apiSecret?: string;
  clientId?: string;
  useApi?: boolean;
};

export class GoogleAnalyticsAdapter extends BasePixelAdapter {
  private ga4Config(): GoogleAnalyticsConfig {
    return (this.config || {}) as GoogleAnalyticsConfig;
  }

  validatePixel(): void {
    const { measurementId } = this.ga4Config();
    if (!measurementId) throw new Error('Google Analytics measurementId is required');
  }

  async sendPurchaseEvent(data: TransactionData): Promise<PixelSendResult> {
    const payload = this.formatPayload({ event: 'purchase', data });
    return { payload, transport: this.ga4Config().useApi ? 'api' : 'gtag' };
  }

  async sendLeadEvent(data: LeadData): Promise<PixelSendResult> {
    const payload = this.formatPayload({ event: 'generate_lead', data });
    return { payload, transport: this.ga4Config().useApi ? 'api' : 'gtag' };
  }

  async sendBeginCheckoutEvent(data: TransactionData): Promise<PixelSendResult> {
    const payload = this.formatPayload({ event: 'begin_checkout', data });
    return { payload, transport: this.ga4Config().useApi ? 'api' : 'gtag' };
  }

  formatPayload(input: unknown): Record<string, unknown> {
    const { measurementId, apiSecret, clientId } = this.ga4Config();
    const { event, data } = (input as { event: string; data: any }) || {};

    const base: Record<string, unknown> = {
      platform: 'google_analytics',
      measurement_id: measurementId,
      api_secret: apiSecret || null,
      client_id: clientId || null,
      event_name: event,
    };

    if (event === 'purchase') {
      const tx = data as TransactionData;
      base.params = {
        currency: tx.currency,
        value: tx.value,
        transaction_id: tx.transaction_id,
      };
    } else if (event === 'begin_checkout') {
      const tx = data as TransactionData;
      base.params = {
        currency: tx.currency,
        value: tx.value,
        transaction_id: tx.transaction_id,
      };
    } else {
      const lead = data as LeadData;
      base.params = {
        user_email: lead.user_email || null,
        user_phone: lead.user_phone || null,
      };
    }

    return base;
  }
}

