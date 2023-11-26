CREATE TABLE users (
    username VARCHAR(20) PRIMARY KEY CHECK (username = lower(username)),
    password TEXT NOT NULL
    );

CREATE TABLE prayer_tracker (
    username VARCHAR(25)
        REFERENCES users ON DELETE CASCADE,
    notes TEXT,
    has_prayed BOOLEAN NOT NULL DEFAULT FALSE
    );