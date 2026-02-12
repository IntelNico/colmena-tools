# Gym Tracker API — Contrato para Frontend

## Base URL
`/api/workouts`

## Endpoints

### `GET /api/workouts`
Lista entrenos con ejercicios.

**Query params:** `limit` (default 20, max 100), `offset` (default 0)

**Response:**
```json
{
  "data": [Workout],
  "total": number
}
```

### `GET /api/workouts/:id`
Detalle de un entreno con ejercicios.

**Response:** `{ "data": Workout }`

### `POST /api/workouts`
Crear entreno con ejercicios.

**Body:**
```json
{
  "date": "2026-02-12",
  "notes": "Día de pecho",
  "duration_minutes": 60,
  "exercises": [
    { "name": "Press banca", "sets": 4, "reps": 10, "weight": 80, "rest_seconds": 90 },
    { "name": "Aperturas", "sets": 3, "reps": 12, "weight": 14 }
  ]
}
```

**Response:** `201 { "data": Workout }`

### `PUT /api/workouts/:id`
Actualizar entreno. Reemplaza ejercicios completos.

**Body:** mismo formato que POST.

**Response:** `{ "data": Workout }`

### `DELETE /api/workouts/:id`
Borrar entreno (cascade borra ejercicios).

**Response:** `{ "ok": true }`

### `GET /api/workouts/stats`
Estadísticas generales.

**Response:**
```json
{
  "data": {
    "total_workouts": 42,
    "total_exercises": 186,
    "avg_duration_minutes": 55,
    "workouts_this_week": 3,
    "workouts_this_month": 12,
    "most_used_exercises": [
      { "name": "press banca", "count": 15 }
    ]
  }
}
```

## Types

```typescript
interface Workout {
  id: string;
  date: string;          // "YYYY-MM-DD"
  notes: string | null;
  duration_minutes: number | null;
  created_at: string;
  updated_at: string;
  exercises: Exercise[];
}

interface Exercise {
  id: string;
  workout_id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;        // kg
  rest_seconds: number | null;
  sort_order: number;
  created_at: string;
}
```
