// API types — aligned with Zape's backend contract

export interface Exercise {
  id: string;
  workout_id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  rest_seconds: number | null;
  sort_order: number;
  created_at: string;
}

export interface Workout {
  id: string;
  date: string; // "YYYY-MM-DD"
  notes: string | null;
  duration_minutes: number | null;
  created_at: string;
  updated_at: string;
  exercises: Exercise[];
}

export interface WorkoutStats {
  total_workouts: number;
  workouts_this_week: number;
  current_streak: number;
  avg_duration_minutes: number | null;
  top_exercises: { name: string; count: number }[];
}

export interface CreateExerciseInput {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  rest_seconds?: number | null;
}

export interface CreateWorkoutInput {
  date: string;
  notes?: string | null;
  duration_minutes?: number | null;
  exercises: CreateExerciseInput[];
}
