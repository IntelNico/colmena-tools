"use client";

import { useState } from "react";
import Link from "next/link";
import { StatsCards } from "@/components/stats-cards";
import { WorkoutCard } from "@/components/workout-card";
import { MOCK_WORKOUTS, MOCK_STATS } from "@/lib/mock-data";
// import { api } from "@/lib/api"; // TODO: swap mock for real API

export default function HomePage() {
  const [workouts] = useState(MOCK_WORKOUTS);
  const [stats] = useState(MOCK_STATS);

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

      <StatsCards stats={stats} />

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
