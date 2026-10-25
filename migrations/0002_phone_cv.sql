-- Telefonnummer und Lebenslauf (Datei liegt in R2, hier nur der Schlüssel).
ALTER TABLE applications ADD COLUMN phone TEXT;
ALTER TABLE applications ADD COLUMN cv_key TEXT;
