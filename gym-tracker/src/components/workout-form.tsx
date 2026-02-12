"use client";

import { useState } from "react";
import type { CreateWorkoutInput, CreateExerciseInput } from "@/lib/types";
import { ExerciseForm } from "./exercise-form";

interface WorkoutFormProps {
  onSubmit: (data: CreateWorkoutInput) => void;
  loading?: boolean;
}

const emptyExercise = (): CreateExerciseInput => ({
  name: "",
  sets: 3,
  reps: 10,
  weight: 0,
  rest_seconds: 90,
});

export function WorkoutForm({ onSubmit, loading }: WorkoutFormProps) {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [notes, setNotes] = useState("");
  const [duration, setDuration] = useState<number | "">("");
  const [exercises, setExercises] = useState<CreateExerciseInput[]>([
    emptyExercise(),
  ]);

  const updateExercise = (i: number, ex: CreateExerciseInput) => {
    const next = [...exercises];
    next[i] = ex;
    setExercises(next);
  };

  const removeExercise = (i: number) => {
    if (exercises.length <= 1) return;
    setExercises(exercises.filter((_, idx) => idx !== i));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = exercises.filter((ex) => ex.name.trim());
    if (!valid.length) return;

    onSubmit({
      date,
      notes: notes || null,
      duration_minutes: duration || null,
      exercises: valid,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-sm text-zinc-400">Fecha</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-400">
            Duración (min)
          </label>
          <input
            type="number"
            min="1"
            value={duration}
            onChange={(e) =>
              setDuration(e.target.value ? Number(e.target.value) : "")
            }
            placeholder="60"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-zinc-400">Notas</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="¿Cómo fue el entreno?"
          rows={2}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none resize-none"
        />
      </div>

      <div className="space-y-3">
        {exercises.map((ex, i) => (
          <ExerciseForm
            key={i}
            index={i}
            exercise={ex}
            onChange={updateExercise}
            onRemove={removeExercise}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => setExercises([...exercises, emptyExercise()])}
        className="w-full rounded-lg border border-dashed border-zinc-700 py-2 text-sm text-zinc-400 hover:border-zinc-500 hover:text-zinc-300"
      >
        + Añadir ejercicio
      </button>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50"
      >
        {loading ? "Guardando..." : "Guardar entreno"}
      </button>
    </form>
  );
}
