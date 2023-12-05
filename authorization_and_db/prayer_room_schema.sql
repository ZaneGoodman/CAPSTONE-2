CREATE TABLE users (
    username VARCHAR(20) PRIMARY KEY CHECK (lower(username) = lower(username)),
    password TEXT NOT NULL
    );

CREATE TABLE prayer_tracker (
    id SERIAL PRIMARY KEY ,
    username VARCHAR(25)
        REFERENCES users ON DELETE CASCADE,
    notes TEXT,
    has_prayed BOOLEAN NOT NULL DEFAULT FALSE,
    date DATE NOT NULL,
    season VARCHAR(200) NOT NULL
    );