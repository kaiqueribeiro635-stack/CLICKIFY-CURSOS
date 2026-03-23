import { BasePixelAdapter } from './base-pixel-adapter';
import { PixelSendResult, TransactionData, LeadData } from '../types';

export class PinterestAdapter extends BasePixelAdapter {
  async initialize(): Promise<void> {
    // Pinterest Pixel initialization
  }

  async validatePixel(): Promise<boolean> {
    const pixelId = this.config.pixelId as string;
    return !!pixelId && pixelId.length > 5;
  }

  async sendPurchaseEvent(data: TransactionData): Promise<PixelSendResult> {
    const payload = this.formatPayload(data);
    // Logic for Pinterest checkout event
    return { payload, transport: 'pixel' };
  }

  async sendLeadEvent(data: LeadData): Promise<PixelSendResult> {
    const payload = this.formatPayload(data);
    return { payload, transport: 'pixel' };
  }

  formatPayload(data: any): Record<string, unknown> {
    return {
      event_name: 'checkout',
      value: data.value,
      currency: data.currency || 'BRL',
      order_id: data.transaction_id,
      // Pinterest specific
    };
  }
}
