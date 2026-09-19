CREATE TABLE IF NOT EXISTS venues (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(150) NOT NULL,

    address VARCHAR(255),

    hourly_rate NUMERIC(10, 2) NOT NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT venues_hourly_rate_check
        CHECK (hourly_rate >= 0)
);