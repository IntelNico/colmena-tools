import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { WorkoutInput } from "@/lib/types";

// GET /api/workouts — List workouts with exercises
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const limit = Math.min(Number(searchParams.get("limit") || 20), 100);
  const offset = Number(searchParams.get("offset") || 0);

  const { data: workouts, error, count } = await supabase
    .from("workouts")
    .select("*, exercises(*)", { count: "exact" })
    .order("date", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Sort exercises by sort_order within each workout
  const sorted = workouts?.map((w) => ({
    ...w,
    exercises: (w.exercises || []).sort(
      (a: any, b: any) => a.sort_order - b.sort_order
    ),
  }));

  return NextResponse.json({ data: sorted, total: count });
}

// POST /api/workouts — Create workout with exercises
export async function POST(req: NextRequest) {
  let body: WorkoutInput;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.date || !body.exercises?.length) {
    return NextResponse.json(
      { error: "date and at least one exercise are required" },
      { status: 400 }
    );
  }

  // Insert workout
  const { data: workout, error: wErr } = await supabase
    .from("workouts")
    .insert({
      date: body.date,
      notes: body.notes ?? null,
      duration_minutes: body.duration_minutes ?? null,
    })
    .select()
    .single();

  if (wErr || !workout) {
    return NextResponse.json(
      { error: wErr?.message || "Failed to create workout" },
      { status: 500 }
    );
  }

  // Insert exercises
  const exercises = body.exercises.map((ex, i) => ({
    workout_id: workout.id,
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
    // Rollback workout
    await supabase.from("workouts").delete().eq("id", workout.id);
    return NextResponse.json({ error: exErr.message }, { status: 500 });
  }

  return NextResponse.json(
    { data: { ...workout, exercises: exData } },
    { status: 201 }
  );
}
