-- Migration: create_unique_views_table.sql

CREATE TABLE IF NOT EXISTS unique_views (
    id SERIAL PRIMARY KEY,
    user_ip TEXT NOT NULL,
    path TEXT NOT NULL,
    type TEXT NOT NULL,
    slug TEXT NULL,
    first_view_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_view_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    view_count INTEGER NOT NULL DEFAULT 1,
    details JSONB NULL
);

-- Create a unique index to avoid duplicates by user/path/type/slug
CREATE UNIQUE INDEX IF NOT EXISTS uq_unique_views_user_path_type_slug
ON unique_views(user_ip, path, type, slug);
