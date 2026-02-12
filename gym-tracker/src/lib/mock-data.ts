import type { Workout, WorkoutStats } from "./types";

export const MOCK_WORKOUTS: Workout[] = [
  {
    id: "1",
    date: "2026-02-12",
    notes: "Día de pecho y tríceps. Buenas sensaciones.",
    duration_minutes: 65,
    created_at: "2026-02-12T10:00:00Z",
    updated_at: "2026-02-12T10:00:00Z",
    exercises: [
      { id: "e1", workout_id: "1", name: "Press banca", sets: 4, reps: 8, weight: 80, rest_seconds: 120, sort_order: 1, created_at: "2026-02-12T10:00:00Z" },
      { id: "e2", workout_id: "1", name: "Press inclinado mancuernas", sets: 3, reps: 10, weight: 30, rest_seconds: 90, sort_order: 2, created_at: "2026-02-12T10:00:00Z" },
      { id: "e3", workout_id: "1", name: "Fondos en paralelas", sets: 3, reps: 12, weight: 0, rest_seconds: 60, sort_order: 3, created_at: "2026-02-12T10:00:00Z" },
    ],
  },
  {
    id: "2",
    date: "2026-02-10",
    notes: "Pierna. Sentadillas pesadas.",
    duration_minutes: 75,
    created_at: "2026-02-10T09:00:00Z",
    updated_at: "2026-02-10T09:00:00Z",
    exercises: [
      { id: "e4", workout_id: "2", name: "Sentadilla", sets: 5, reps: 5, weight: 120, rest_seconds: 180, sort_order: 1, created_at: "2026-02-10T09:00:00Z" },
      { id: "e5", workout_id: "2", name: "Prensa", sets: 4, reps: 10, weight: 200, rest_seconds: 120, sort_order: 2, created_at: "2026-02-10T09:00:00Z" },
      { id: "e6", workout_id: "2", name: "Curl femoral", sets: 3, reps: 12, weight: 45, rest_seconds: 60, sort_order: 3, created_at: "2026-02-10T09:00:00Z" },
    ],
  },
  {
    id: "3",
    date: "2026-02-08",
    notes: null,
    duration_minutes: 55,
    created_at: "2026-02-08T11:00:00Z",
    updated_at: "2026-02-08T11:00:00Z",
    exercises: [
      { id: "e7", workout_id: "3", name: "Dominadas", sets: 4, reps: 8, weight: 10, rest_seconds: 120, sort_order: 1, created_at: "2026-02-08T11:00:00Z" },
      { id: "e8", workout_id: "3", name: "Remo con barra", sets: 4, reps: 8, weight: 70, rest_seconds: 90, sort_order: 2, created_at: "2026-02-08T11:00:00Z" },
      { id: "e9", workout_id: "3", name: "Curl bíceps", sets: 3, reps: 12, weight: 14, rest_seconds: 60, sort_order: 3, created_at: "2026-02-08T11:00:00Z" },
    ],
  },
];

export const MOCK_STATS: WorkoutStats = {
  total_workouts: 47,
  workouts_this_week: 3,
  current_streak: 5,
  avg_duration_minutes: 62,
  top_exercises: [
    { name: "Press banca", count: 38 },
    { name: "Sentadilla", count: 35 },
    { name: "Dominadas", count: 30 },
    { name: "Peso muerto", count: 28 },
    { name: "Press militar", count: 25 },
  ],
};
