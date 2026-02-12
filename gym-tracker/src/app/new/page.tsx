"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WorkoutForm } from "@/components/workout-form";
import { api } from "@/lib/api";
import type { CreateWorkoutInput } from "@/lib/types";
import Link from "next/link";

export default function NewWorkoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CreateWorkoutInput) => {
    setLoading(true);
    setError(null);
    try {
      await api.workouts.create(data);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error guardando entreno");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-400 hover:text-white"
        >
          ← Atrás
        </Link>
        <h1 className="text-2xl font-bold">Nuevo entreno</h1>
      </div>

      {error && (
        <div className="rounded-lg bg-red-900/30 border border-red-800 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <WorkoutForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
