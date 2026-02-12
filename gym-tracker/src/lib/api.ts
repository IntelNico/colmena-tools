import type { Workout, WorkoutStats, CreateWorkoutInput } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";

async function fetcher<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${body}`);
  }
  return res.json();
}

export const api = {
  workouts: {
    list: (limit = 20, offset = 0) =>
      fetcher<Workout[]>(`/workouts?limit=${limit}&offset=${offset}`),

    get: (id: string) => fetcher<Workout>(`/workouts/${id}`),

    create: (data: CreateWorkoutInput) =>
      fetcher<Workout>("/workouts", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    update: (id: string, data: Partial<CreateWorkoutInput>) =>
      fetcher<Workout>(`/workouts/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),

    delete: (id: string) =>
      fetcher<void>(`/workouts/${id}`, { method: "DELETE" }),

    stats: () => fetcher<WorkoutStats>("/workouts/stats"),
  },
};
