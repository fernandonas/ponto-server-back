CREATE TABLE IF NOT EXISTS match_players (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    match_id UUID NOT NULL,

    user_id UUID NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT match_players_match_fk
        FOREIGN KEY (match_id)
        REFERENCES matches(id)
        ON DELETE CASCADE,

    CONSTRAINT match_players_user_fk
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    CONSTRAINT match_players_unique
        UNIQUE (match_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_match_players_match_id
    ON match_players(match_id);

CREATE INDEX IF NOT EXISTS idx_match_players_user_id
    ON match_players(user_id);