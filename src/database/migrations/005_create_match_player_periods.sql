CREATE TABLE IF NOT EXISTS match_player_periods (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    match_player_id UUID NOT NULL,

    start_time TIME NOT NULL,

    end_time TIME NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT match_player_periods_match_player_fk
        FOREIGN KEY (match_player_id)
        REFERENCES match_players(id)
        ON DELETE CASCADE,

    CONSTRAINT match_player_periods_time_check
        CHECK (end_time > start_time)
);

CREATE INDEX IF NOT EXISTS idx_match_player_periods_match_player_id
    ON match_player_periods(match_player_id);