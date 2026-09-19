CREATE TABLE IF NOT EXISTS payments (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    match_player_id UUID NOT NULL,

    amount NUMERIC(10, 2) NOT NULL,

    payment_method VARCHAR(20) NOT NULL,

    paid_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT payments_match_player_fk
        FOREIGN KEY (match_player_id)
        REFERENCES match_players(id)
        ON DELETE CASCADE,

    CONSTRAINT payments_amount_check
        CHECK (amount > 0),

    CONSTRAINT payments_payment_method_check
        CHECK (
            payment_method IN (
                'cash',
                'pix',
                'credit_card',
                'debit_card',
                'other'
            )
        )
);

CREATE INDEX IF NOT EXISTS idx_payments_match_player_id
    ON payments(match_player_id);