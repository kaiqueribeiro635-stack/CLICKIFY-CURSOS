CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title varchar NOT NULL,
  description text NULL,
  category varchar NOT NULL,
  type varchar NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  status varchar NOT NULL DEFAULT 'active',
  require_address boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products (category);
CREATE INDEX IF NOT EXISTS idx_products_status ON products (status);
