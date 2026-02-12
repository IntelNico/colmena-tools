-- Gym Tracker Schema
-- Tables: workouts, exercises

CREATE TABLE IF NOT EXISTS workouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL DEFAULT CURRENT_DATE,
  notes text,
  duration_minutes integer,  -- Sugerencia de Zipi
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id uuid NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
  name text NOT NULL,
  sets integer NOT NULL DEFAULT 1,
  reps integer NOT NULL DEFAULT 1,
  weight numeric(6,2) NOT NULL DEFAULT 0,
  rest_seconds integer,  -- Sugerencia de Zipi
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_workouts_date ON workouts(date DESC);
CREATE INDEX idx_exercises_workout ON exercises(workout_id);

-- Auto-update updated_at on workouts
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER workouts_updated_at
  BEFORE UPDATE ON workouts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
