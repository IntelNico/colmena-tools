"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StatsCards } from "@/components/stats-cards";
import { WorkoutCard } from "@/components/workout-card";
import { api } from "@/lib/api";
import type { Workout, WorkoutStats } from "@/lib/types";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [stats, setStats] = useState<WorkoutStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [wRes, sRes] = await Promise.all([
          api.workouts.list(),
          api.workouts.stats(),
        ]);
        setWorkouts(wRes.data);
        setStats(sRes.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error cargando datos");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-zinc-500">Cargando entrenos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">💪 Gym Tracker</h1>
        <Link
          href="/new"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-500"
        >
          + Entreno
        </Link>
      </div>

      {stats && <StatsCards stats={stats} />}

      <div>
        <h2 className="mb-3 text-lg font-semibold text-zinc-300">
          Historial
        </h2>
        <div className="space-y-3">
          {workouts.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>

        {workouts.length === 0 && (
          <p className="py-12 text-center text-zinc-500">
            No hay entrenos todavía. ¡Empieza uno!
          </p>
        )}
      </div>
    </div>
  );
}
