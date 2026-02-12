"use client";

import type { Workout } from "@/lib/types";
import Link from "next/link";

interface WorkoutCardProps {
  workout: Workout;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  const totalVolume = workout.exercises.reduce(
    (sum, ex) => sum + ex.sets * ex.reps * ex.weight,
    0
  );

  return (
    <Link href={`/workout/${workout.id}`}>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-colors hover:border-zinc-600 active:bg-zinc-800">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm font-medium text-zinc-400">
              {formatDate(workout.date)}
            </div>
            <div className="mt-1 text-lg font-semibold text-white">
              {workout.exercises.length} ejercicio{workout.exercises.length !== 1 && "s"}
            </div>
          </div>
          <div className="text-right">
            {workout.duration_minutes && (
              <div className="text-sm text-zinc-400">
                {workout.duration_minutes} min
              </div>
            )}
            <div className="text-sm font-medium text-emerald-400">
              {totalVolume.toLocaleString()} kg vol.
            </div>
          </div>
        </div>

        {workout.notes && (
          <p className="mt-2 text-sm text-zinc-500 line-clamp-1">
            {workout.notes}
          </p>
        )}

        <div className="mt-3 flex flex-wrap gap-1.5">
          {workout.exercises.map((ex) => (
            <span
              key={ex.id}
              className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-300"
            >
              {ex.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
