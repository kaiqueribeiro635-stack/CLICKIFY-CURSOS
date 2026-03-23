import { PixelConfig, PixelSendResult, TransactionData, LeadData } from '../types';

export abstract class BasePixelAdapter {
  protected config: PixelConfig | null = null;

  initialize(config: PixelConfig): void {
    this.config = config;
  }

  validatePixel(): void {
    throw new Error('validatePixel() must be implemented');
  }

  sendPurchaseEvent(data: TransactionData): Promise<PixelSendResult> {
    throw new Error('sendPurchaseEvent() must be implemented');
  }

  sendLeadEvent(data: LeadData): Promise<PixelSendResult> {
    throw new Error('sendLeadEvent() must be implemented');
  }

  formatPayload(data: unknown): Record<string, unknown> {
    throw new Error('formatPayload() must be implemented');
  }
}

