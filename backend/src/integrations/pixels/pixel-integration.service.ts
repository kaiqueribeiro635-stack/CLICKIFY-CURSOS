import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PixelAdapterFactory } from './pixel-adapter.factory';
import { PixelEventType, PixelPlatform, TransactionData, LeadData, PixelEventStatus, PixelSendResult } from './types';
import { ProductPixelEntity } from '../../entities/product-pixel.entity';
import { PixelEventLogEntity } from '../../entities/pixel-event-log.entity';

export type TriggerOptions = {
  retries?: number;
  timeoutMs?: number;
};

@Injectable()
export class PixelIntegrationService {
  private readonly logger = new Logger(PixelIntegrationService.name);

  constructor(
    private readonly factory: PixelAdapterFactory,
    @InjectRepository(ProductPixelEntity) private readonly productPixelRepo: Repository<ProductPixelEntity>,
    @InjectRepository(PixelEventLogEntity) private readonly logRepo: Repository<PixelEventLogEntity>,
  ) {}

  async triggerPurchase(productId: string, transactionData: TransactionData, options?: TriggerOptions): Promise<void> {
    await this.triggerEvent(productId, 'purchase', transactionData, options);
  }

  async triggerLead(productId: string, userData: LeadData, options?: TriggerOptions): Promise<void> {
    await this.triggerEvent(productId, 'lead', userData, options);
  }

  private async triggerEvent(
    productId: string,
    eventType: PixelEventType,
    data: TransactionData | LeadData,
    options?: TriggerOptions,
  ): Promise<void> {
    const pixels = await this.productPixelRepo.find({ where: { productId, active: true } });
    for (const pixel of pixels) {
      await this.dispatchToPlatform(productId, pixel.platform, pixel.config, eventType, data, options);
    }
  }

  private async dispatchToPlatform(
    productId: string,
    platform: PixelPlatform,
    config: Record<string, unknown>,
    eventType: PixelEventType,
    data: TransactionData | LeadData,
    options?: TriggerOptions,
  ): Promise<void> {
    let payloadSent: Record<string, unknown> = {};
    let status: PixelEventStatus = 'success';
    let errorMessage: string | null = null;

    try {
      const adapter = this.factory.createAdapter(platform);
      adapter.initialize(config);
      adapter.validatePixel();

      const result = await this.executeWithRetry(
        () => this.sendByEventType(adapter, eventType, data),
        {
          retries: options?.retries ?? Number(process.env.PIXEL_RETRY_MAX ?? 3),
          timeoutMs: options?.timeoutMs ?? Number(process.env.PIXEL_TIMEOUT_MS ?? 2500),
        },
      );

      payloadSent = result.payload;
    } catch (err) {
      status = 'error';
      errorMessage = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Pixel dispatch failed: product=${productId} platform=${platform} event=${eventType} error=${errorMessage}`);
    }

    await this.logRepo.insert({
      productId,
      platform,
      eventType,
      payloadSent,
      status,
      errorMessage,
    });
  }

  private async sendByEventType(
    adapter: { sendPurchaseEvent: any; sendLeadEvent: any },
    eventType: PixelEventType,
    data: TransactionData | LeadData,
  ): Promise<PixelSendResult> {
    if (eventType === 'purchase') return adapter.sendPurchaseEvent(data as TransactionData);
    if (eventType === 'lead') return adapter.sendLeadEvent(data as LeadData);
    throw new Error(`Unsupported eventType: ${eventType}`);
  }

  private async executeWithRetry<T>(fn: () => Promise<T>, opts: { retries: number; timeoutMs: number }): Promise<T> {
    const retries = Math.max(0, Number.isFinite(opts.retries) ? opts.retries : 0);
    const timeoutMs = Math.max(0, Number.isFinite(opts.timeoutMs) ? opts.timeoutMs : 0);

    let lastError: unknown;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await this.withTimeout(fn(), timeoutMs);
      } catch (err) {
        lastError = err;
      }
    }
    throw lastError;
  }

  private withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    if (!ms) return promise;
    return new Promise<T>((resolve, reject) => {
      const t = setTimeout(() => reject(new Error('Pixel dispatch timeout')), ms);
      promise.then(
        (v) => {
          clearTimeout(t);
          resolve(v);
        },
        (e) => {
          clearTimeout(t);
          reject(e);
        },
      );
    });
  }
}

