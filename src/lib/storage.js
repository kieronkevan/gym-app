// Prototype storage layer. Everything lives in localStorage, namespaced
// by a mock user id, so the UI already behaves like it's per-user without
// needing real auth or a backend yet. When that's ready, only this file
// should need to change — nothing above it should know or care where the
// data physically lives.

const MOCK_USER_ID = 'kie';

function key(name) {
  return `fitness-log:${MOCK_USER_ID}:${name}`;
}

export function getCurrentUser() {
  return { id: MOCK_USER_ID, name: 'Kie' };
}

export function getSessions() {
  const raw = localStorage.getItem(key('sessions'));
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveSessions(sessions) {
  localStorage.setItem(key('sessions'), JSON.stringify(sessions));
}

export function getUnit() {
  return localStorage.getItem(key('unit')) || 'kg';
}

export function setUnit(unit) {
  localStorage.setItem(key('unit'), unit);
}
