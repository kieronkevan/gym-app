// Manually curated MVP list. Flat and independent by design — a barbell
// and dumbbell version of the same movement are two separate entries with
// their own history, not variants of one record. Swap this for a licensed
// database later without changing anything that reads from it, as long as
// the shape (id, name) stays the same.

let nextId = 1;
function exercise(name) {
  return { id: String(nextId++), name };
}

export const EXERCISES = [
  // Push
  exercise('Bench press (barbell)'),
  exercise('Bench press (dumbbell)'),
  exercise('Incline bench press (barbell)'),
  exercise('Overhead press (barbell)'),
  exercise('Shoulder press (dumbbell)'),
  exercise('Dips'),
  exercise('Tricep pushdown'),
  exercise('Tricep pushdown (single arm)'),
  exercise('Overhead tricep extension (cable)'),
  exercise('Lateral raise (dumbbell)'),
  exercise('Seated lateral raise (dumbbell)'),
  exercise('Rear delt fly (dumbbell)'),
  exercise('Chest fly (dumbbell)'),
  exercise('Pec deck'),
  exercise('Chest press (machine)'),
  // Pull
  exercise('Deadlift (barbell)'),
  exercise('Pull-up'),
  exercise('Pull-up (assisted)'),
  exercise('Chin-up'),
  exercise('Barbell row'),
  exercise('Dumbbell row'),
  exercise('T-bar row'),
  exercise('Machine row'),
  exercise('Lat pulldown'),
  exercise('Lat pullover (dumbbell)'),
  exercise('Cable row (seated)'),
  exercise('Bicep curl (dumbbell)'),
  exercise('Bicep curl (barbell)'),
  exercise('African curls'),
  exercise('Face pull'),
  // Legs
  exercise('Squat (barbell)'),
  exercise('Front squat (barbell)'),
  exercise('Romanian deadlift (barbell)'),
  exercise('Leg press'),
  exercise('Lunge (dumbbell)'),
  exercise('Bulgarian split squat (dumbbell)'),
  exercise('Leg curl (machine)'),
  exercise('Leg extension (machine)'),
  exercise('Calf raise (standing)'),
  exercise('Hip thrust (barbell)'),
  // Core
  exercise('Plank'),
  exercise('Hanging leg raise'),
  exercise('Cable crunch'),
  exercise('Russian twist'),
  // Full-body / conditioning
  exercise('Kettlebell swing'),
  exercise('Clean and press (barbell)'),
  exercise("Farmer's carry (dumbbell)"),
  exercise('Burpee'),
];

export function searchExercises(query) {
  const q = query.trim().toLowerCase();
  if (!q) return EXERCISES;
  return EXERCISES.filter((e) => e.name.toLowerCase().includes(q));
}
