CREATE TABLE IF NOT EXISTS expense_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    expense_id UUID NOT NULL,
    payer_id UUID NOT NULL,
    receiver_id UUID NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_expense_participants_expense
        FOREIGN KEY (expense_id)
        REFERENCES expenses(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_expense_participants_payer
        FOREIGN KEY (payer_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_expense_participants_receiver
        FOREIGN KEY (receiver_id)
        REFERENCES users(id)
        ON DELETE RESTRICT
);