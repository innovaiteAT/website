-- Bewerbungen aus der Sektion #mitmachen.
-- Pflichtspalten laut docs/APPLICATION-FLOW.md. Zusatzfragen landen in `extra` (JSON),
-- oder bekommen eine eigene Spalte über eine neue Migration.
CREATE TABLE applications (
  id            TEXT PRIMARY KEY,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  email         TEXT NOT NULL,
  departments   TEXT NOT NULL,
  source        TEXT NOT NULL,
  source_detail TEXT,
  extra         TEXT,
  consent_at    TEXT NOT NULL,
  review_state  TEXT NOT NULL DEFAULT 'neu'
);

CREATE INDEX idx_applications_created_at ON applications (created_at);
