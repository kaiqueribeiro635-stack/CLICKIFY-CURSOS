import { BasePixelAdapter } from './base-pixel-adapter';
import { PixelSendResult, TransactionData, LeadData } from '../types';

export class KwaiAdapter extends BasePixelAdapter {
  async initialize(): Promise<void> {
    // Kwai Pixel JS initialization would go here
  }

  async validatePixel(): Promise<boolean> {
    const pixelId = this.config.pixelId as string;
    return !!pixelId && pixelId.length > 5;
  }

  async sendPurchaseEvent(data: TransactionData): Promise<PixelSendResult> {
    const payload = this.formatPayload(data);
    // Logic for Kwai Pixel or Events API
    return { payload, transport: 'pixel' };
  }

  async sendLeadEvent(data: LeadData): Promise<PixelSendResult> {
    const payload = this.formatPayload(data);
    return { payload, transport: 'pixel' };
  }

  formatPayload(data: any): Record<string, unknown> {
    return {
      content_type: 'product',
      value: data.value,
      currency: data.currency || 'BRL',
      content_id: data.transaction_id,
      // Kwai specific fields
    };
  }
}
