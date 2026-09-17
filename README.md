# Fitness log — first build

Scope: the core logging loop (blank page → add exercise → add set) and
history only, exactly as agreed. No exercise database licensing, no
progression charts yet — those come later once this loop is tested.

## Running it

```
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).
Open it on your phone via your computer's local network address to test
it the way you actually would — one-handed, mid-set.

## What's real vs mocked

- **Storage**: localStorage, namespaced by a hardcoded mock user ("kie").
  Persists across reloads on one device, but isn't shared between
  devices or people yet — see `src/lib/storage.js`.
- **Auth**: none. There's a single mock user. Swapping in real auth later
  should only mean changing `getCurrentUser()` in `storage.js`.
- **Exercise list**: the curated ~36 from `src/lib/exercises.js`. Edit
  that file directly to add, remove, or reword entries.
- **Units**: global kg/lb default in Settings, converts already-logged
  weights on toggle (stored internally in kg — see `src/lib/units.js`).

## Deploying so a friend can test it

Push this to GitHub and connect it to Vercel or Netlify (both have a
free tier and auto-deploy on push) — that gives you a real URL to hand
to people without needing to explain how to run a dev server.

## Structure

```
src/
  components/
    SessionPage/   the logging page itself
    History/       the list of past sessions
    shared/         settings + the unit toggle
  context/          global unit state
  hooks/            useSession (in-progress page), useHistory (saved list)
  lib/              storage, unit conversion, exercise seed list
```
