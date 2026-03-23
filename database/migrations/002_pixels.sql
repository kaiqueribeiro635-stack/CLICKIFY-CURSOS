CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS product_pixels (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id uuid NOT NULL,
  platform varchar NOT NULL,
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_product_pixels_product_active ON product_pixels (product_id, active);

CREATE TABLE IF NOT EXISTS pixel_event_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id uuid NOT NULL,
  platform varchar NOT NULL,
  event_type varchar NOT NULL,
  payload_sent jsonb NOT NULL,
  status varchar NOT NULL,
  error_message text NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pixel_event_logs_product_created_at ON pixel_event_logs (product_id, created_at DESC);

