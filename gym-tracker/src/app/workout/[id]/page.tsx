"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import type { Workout } from "@/lib/types";

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    api.workouts
      .get(id)
      .then((res) => setWorkout(res.data))
      .catch(() => setWorkout(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("¿Borrar este entreno?")) return;
    setDeleting(true);
    try {
      await api.workouts.delete(id);
      router.push("/");
    } catch {
      alert("Error borrando entreno");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-zinc-500">Cargando...</div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="py-20 text-center text-zinc-500">
        Entreno no encontrado
      </div>
    );
  }

  const totalVolume = workout.exercises.reduce(
    (sum, ex) => sum + ex.sets * ex.reps * ex.weight,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-400 hover:text-white"
          >
            ← Atrás
          </Link>
          <div>
            <h1 className="text-xl font-bold">{formatDate(workout.date)}</h1>
            <div className="flex gap-3 text-sm text-zinc-400">
              {workout.duration_minutes && (
                <span>⏱️ {workout.duration_minutes} min</span>
              )}
              <span>🏋️ {totalVolume.toLocaleString()} kg vol.</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-lg border border-red-800 px-3 py-1.5 text-sm text-red-400 hover:bg-red-900/30 disabled:opacity-50"
        >
          {deleting ? "Borrando..." : "Borrar"}
        </button>
      </div>

      {workout.notes && (
        <p className="rounded-lg bg-zinc-900 p-3 text-sm text-zinc-300">
          {workout.notes}
        </p>
      )}

      <div className="space-y-3">
        {workout.exercises.map((ex) => (
          <div
            key={ex.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
          >
            <div className="flex items-start justify-between">
              <div className="font-semibold text-white">{ex.name}</div>
              <div className="text-sm text-emerald-400">
                {(ex.sets * ex.reps * ex.weight).toLocaleString()} kg
              </div>
            </div>
            <div className="mt-2 flex gap-4 text-sm text-zinc-400">
              <span>{ex.sets} series</span>
              <span>{ex.reps} reps</span>
              <span>{ex.weight} kg</span>
              {ex.rest_seconds && <span>{ex.rest_seconds}s descanso</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
