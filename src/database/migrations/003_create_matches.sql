CREATE TABLE IF NOT EXISTS matches (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    venue_id UUID NOT NULL,

    match_date DATE NOT NULL,

    start_time TIME NOT NULL,

    end_time TIME NOT NULL,

    hourly_rate NUMERIC(10, 2) NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'open',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT matches_venue_fk
        FOREIGN KEY (venue_id)
        REFERENCES venues(id),

    CONSTRAINT matches_time_check
        CHECK (end_time > start_time),

    CONSTRAINT matches_hourly_rate_check
        CHECK (hourly_rate >= 0),

    CONSTRAINT matches_status_check
        CHECK (
            status IN (
                'open',
                'in_progress',
                'finished',
                'cancelled'
            )
        )
);

CREATE INDEX IF NOT EXISTS idx_matches_venue_id
    ON matches(venue_id);

CREATE INDEX IF NOT EXISTS idx_matches_match_date
    ON matches(match_date);