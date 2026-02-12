import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { WorkoutInput } from "@/lib/types";

interface Params {
  params: { id: string };
}

// GET /api/workouts/:id — Get single workout with exercises
export async function GET(_req: NextRequest, { params }: Params) {
  const { data, error } = await supabase
    .from("workouts")
    .select("*, exercises(*)")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Workout not found" }, { status: 404 });
  }

  data.exercises = (data.exercises || []).sort(
    (a: any, b: any) => a.sort_order - b.sort_order
  );

  return NextResponse.json({ data });
}

// PUT /api/workouts/:id — Update workout + replace exercises
export async function PUT(req: NextRequest, { params }: Params) {
  let body: WorkoutInput;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Update workout fields
  const { data: workout, error: wErr } = await supabase
    .from("workouts")
    .update({
      date: body.date,
      notes: body.notes ?? null,
      duration_minutes: body.duration_minutes ?? null,
    })
    .eq("id", params.id)
    .select()
    .single();

  if (wErr || !workout) {
    return NextResponse.json(
      { error: wErr?.message || "Workout not found" },
      { status: 404 }
    );
  }

  // Replace exercises: delete old, insert new
  await supabase.from("exercises").delete().eq("workout_id", params.id);

  const exercises = (body.exercises || []).map((ex, i) => ({
    workout_id: params.id,
    name: ex.name,
    sets: ex.sets,
    reps: ex.reps,
    weight: ex.weight,
    rest_seconds: ex.rest_seconds ?? null,
    sort_order: ex.sort_order ?? i,
  }));

  const { data: exData, error: exErr } = await supabase
    .from("exercises")
    .insert(exercises)
    .select();

  if (exErr) {
    return NextResponse.json({ error: exErr.message }, { status: 500 });
  }

  return NextResponse.json({ data: { ...workout, exercises: exData } });
}

// DELETE /api/workouts/:id — Delete workout (cascade deletes exercises)
export async function DELETE(_req: NextRequest, { params }: Params) {
  const { error } = await supabase
    .from("workouts")
    .delete()
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
