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

export interface ExerciseInput {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  rest_seconds?: number | null;
  sort_order?: number;
}

export interface Workout {
  id: string;
  date: string;
  notes: string | null;
  duration_minutes: number | null;
  created_at: string;
  updated_at: string;
  exercises: Exercise[];
}

export interface WorkoutInput {
  date: string;
  notes?: string | null;
  duration_minutes?: number | null;
  exercises: ExerciseInput[];
}

export interface WorkoutStats {
  total_workouts: number;
  total_exercises: number;
  avg_duration_minutes: number | null;
  workouts_this_week: number;
  workouts_this_month: number;
  most_used_exercises: { name: string; count: number }[];
}
