-- Seed data for users table
-- This file contains example users for development and testing

INSERT INTO users (name, email, created_at) VALUES
  ('Jan Kowalski', 'jan.kowalski@example.com', NOW()),
  ('Anna Nowak', 'anna.nowak@example.com', NOW()),
  ('Piotr Wiśniewski', 'piotr.wisniewski@example.com', NOW()),
  ('Maria Wójcik', 'maria.wojcik@example.com', NOW()),
  ('Krzysztof Kamiński', 'krzysztof.kaminski@example.com', NOW())
ON CONFLICT (email) DO NOTHING;
