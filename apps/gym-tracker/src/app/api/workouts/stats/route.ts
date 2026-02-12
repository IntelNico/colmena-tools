import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/workouts/stats — Workout statistics
export async function GET() {
  // Total workouts
  const { count: totalWorkouts } = await supabase
    .from("workouts")
    .select("*", { count: "exact", head: true });

  // Total exercises
  const { count: totalExercises } = await supabase
    .from("exercises")
    .select("*", { count: "exact", head: true });

  // Average duration
  const { data: avgData } = await supabase
    .from("workouts")
    .select("duration_minutes")
    .not("duration_minutes", "is", null);

  const durations = (avgData || []).map((w) => w.duration_minutes as number);
  const avgDuration =
    durations.length > 0
      ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
      : null;

  // Workouts this week (Mon-Sun)
  const now = new Date();
  const dayOfWeek = now.getDay() || 7; // Mon=1 .. Sun=7
  const monday = new Date(now);
  monday.setDate(now.getDate() - dayOfWeek + 1);
  monday.setHours(0, 0, 0, 0);

  const { count: thisWeek } = await supabase
    .from("workouts")
    .select("*", { count: "exact", head: true })
    .gte("date", monday.toISOString().split("T")[0]);

  // Workouts this month
  const firstOfMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
  const { count: thisMonth } = await supabase
    .from("workouts")
    .select("*", { count: "exact", head: true })
    .gte("date", firstOfMonth);

  // Most used exercises (top 5)
  const { data: exNames } = await supabase
    .from("exercises")
    .select("name");

  const freq: Record<string, number> = {};
  (exNames || []).forEach((e) => {
    const n = e.name.toLowerCase().trim();
    freq[n] = (freq[n] || 0) + 1;
  });

  const mostUsed = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  return NextResponse.json({
    data: {
      total_workouts: totalWorkouts || 0,
      total_exercises: totalExercises || 0,
      avg_duration_minutes: avgDuration,
      workouts_this_week: thisWeek || 0,
      workouts_this_month: thisMonth || 0,
      most_used_exercises: mostUsed,
    },
  });
}
