"use client";

import type { WorkoutStats } from "@/lib/types";

interface StatsCardsProps {
  stats: WorkoutStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    { label: "Total entrenos", value: stats.total_workouts, icon: "🏋️" },
    { label: "Esta semana", value: stats.workouts_this_week, icon: "📅" },
    { label: "Racha actual", value: `${stats.current_streak} días`, icon: "🔥" },
    { label: "Duración media", value: stats.avg_duration_minutes ? `${stats.avg_duration_minutes} min` : "—", icon: "⏱️" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
        >
          <div className="text-2xl">{c.icon}</div>
          <div className="mt-2 text-2xl font-bold text-white">{c.value}</div>
          <div className="text-sm text-zinc-400">{c.label}</div>
        </div>
      ))}
    </div>
  );
}
