CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS conversion_pixels (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id uuid NOT NULL,
  platform varchar NOT NULL,
  pixel_id varchar NOT NULL,
  domain varchar NULL,
  purchase_pix_enabled boolean NOT NULL DEFAULT false,
  pix_conversion_value integer NOT NULL DEFAULT 100,
  purchase_boleto_enabled boolean NOT NULL DEFAULT false,
  boleto_conversion_value integer NOT NULL DEFAULT 100,
  disable_order_bumps boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_conversion_pixels_product_platform ON conversion_pixels (product_id, platform);

