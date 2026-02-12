"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WorkoutForm } from "@/components/workout-form";
import type { CreateWorkoutInput } from "@/lib/types";
// import { api } from "@/lib/api"; // TODO: connect real API
import Link from "next/link";

export default function NewWorkoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: CreateWorkoutInput) => {
    setLoading(true);
    try {
      // TODO: await api.workouts.create(data);
      console.log("Create workout:", data);
      alert("Entreno guardado (mock). Cuando Zape tenga la API, se conecta de verdad.");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Error guardando entreno");
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

      <WorkoutForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
