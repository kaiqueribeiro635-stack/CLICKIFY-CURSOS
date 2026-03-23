import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'conversion_pixels' })
@Index(['productId', 'platform'])
export class ConversionPixelEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'product_id', type: 'uuid' })
  productId!: string;

  @Column({ type: 'varchar' })
  platform!: string;

  @Column({ name: 'pixel_id', type: 'varchar' })
  pixelId!: string;

  @Column({ type: 'varchar', nullable: true })
  domain!: string | null;

  @Column({ name: 'purchase_pix_enabled', type: 'boolean', default: false })
  purchasePixEnabled!: boolean;

  @Column({ name: 'pix_conversion_value', type: 'int', default: 100 })
  pixConversionValue!: number;

  @Column({ name: 'purchase_boleto_enabled', type: 'boolean', default: false })
  purchaseBoletoEnabled!: boolean;

  @Column({ name: 'boleto_conversion_value', type: 'int', default: 100 })
  boletoConversionValue!: number;

  @Column({ name: 'disable_order_bumps', type: 'boolean', default: false })
  disableOrderBumps!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}

