import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversionPixelEntity } from '../../entities/conversion-pixel.entity';
import { ConversionPixelDto } from './dto/upsert-conversion-pixels.dto';

@Injectable()
export class ConversionPixelsService {
  constructor(@InjectRepository(ConversionPixelEntity) private readonly repo: Repository<ConversionPixelEntity>) {}

  async list(productId: string): Promise<ConversionPixelEntity[]> {
    return this.repo.find({ where: { productId }, order: { createdAt: 'ASC' } });
  }

  async replaceForProduct(productId: string, pixels: ConversionPixelDto[]): Promise<void> {
    const counts: Record<string, number> = {};
    for (const p of pixels) {
      counts[p.platform] = (counts[p.platform] || 0) + 1;
      if (counts[p.platform] > 50) throw new BadRequestException('Limite máximo de 50 pixels por plataforma');
      if (!String(p.pixel_id || '').trim()) throw new BadRequestException('Pixel ID é obrigatório');
    }

    await this.repo.manager.transaction(async (m) => {
      await m.delete(ConversionPixelEntity, { productId });
      if (!pixels.length) return;
      await m.insert(
        ConversionPixelEntity,
        pixels.map((p) => ({
          productId,
          platform: p.platform,
          pixelId: String(p.pixel_id || '').trim(),
          domain: p.domain ? String(p.domain).trim() : null,
          purchasePixEnabled: Boolean(p.purchase_pix_enabled),
          pixConversionValue: Number(p.pix_conversion_value),
          purchaseBoletoEnabled: Boolean(p.purchase_boleto_enabled),
          boletoConversionValue: Number(p.boleto_conversion_value),
          disableOrderBumps: Boolean(p.disable_order_bumps),
        })),
      );
    });
  }
}

