CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  plan VARCHAR(50) DEFAULT 'free',
  stripe_customer_id VARCHAR(255),
  subscription_id VARCHAR(255),
  subscription_status VARCHAR(50) DEFAULT 'inactive',
  queries_used INT DEFAULT 0,
  queries_limit INT DEFAULT 1000,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_stripe_customer ON profiles(stripe_customer_id);
