"use client";

import type { CreateExerciseInput } from "@/lib/types";

interface ExerciseFormProps {
  index: number;
  exercise: CreateExerciseInput;
  onChange: (index: number, exercise: CreateExerciseInput) => void;
  onRemove: (index: number) => void;
}

export function ExerciseForm({ index, exercise, onChange, onRemove }: ExerciseFormProps) {
  const update = (field: keyof CreateExerciseInput, value: string) => {
    const numFields = ["sets", "reps", "weight", "rest_seconds"] as const;
    const parsed = numFields.includes(field as any) ? Number(value) || 0 : value;
    onChange(index, { ...exercise, [field]: parsed });
  };

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-400">
          Ejercicio {index + 1}
        </span>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-sm text-red-400 hover:text-red-300"
        >
          Eliminar
        </button>
      </div>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Nombre del ejercicio"
          value={exercise.name}
          onChange={(e) => update("name", e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div>
            <label className="mb-1 block text-xs text-zinc-500">Series</label>
            <input
              type="number"
              min="1"
              value={exercise.sets || ""}
              onChange={(e) => update("sets", e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-500">Reps</label>
            <input
              type="number"
              min="1"
              value={exercise.reps || ""}
              onChange={(e) => update("reps", e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-500">Peso (kg)</label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={exercise.weight || ""}
              onChange={(e) => update("weight", e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-500">Descanso (s)</label>
            <input
              type="number"
              min="0"
              step="15"
              value={exercise.rest_seconds ?? ""}
              onChange={(e) => update("rest_seconds", e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
