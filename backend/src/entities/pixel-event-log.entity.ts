import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { PixelEventStatus, PixelEventType, PixelPlatform } from '../integrations/pixels/types';

@Entity({ name: 'pixel_event_logs' })
@Index(['productId', 'createdAt'])
export class PixelEventLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'product_id', type: 'uuid' })
  productId!: string;

  @Column({ type: 'varchar' })
  platform!: PixelPlatform;

  @Column({ name: 'event_type', type: 'varchar' })
  eventType!: PixelEventType;

  @Column({ name: 'payload_sent', type: 'jsonb' })
  payloadSent!: Record<string, unknown>;

  @Column({ type: 'varchar' })
  status!: PixelEventStatus;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage!: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}

