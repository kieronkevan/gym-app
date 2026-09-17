import { useState, useCallback, useEffect } from 'react';
import { getSessions, saveSessions } from '../lib/storage.js';

export function useHistory() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    setSessions(getSessions());
  }, []);

  // Upserts a session into history. Called by useSession once a session
  // has at least one exercise — an empty session should never reach here,
  // which is what keeps history free of abandoned "New" taps.
  const upsertSession = useCallback((session) => {
    setSessions((prev) => {
      const exists = prev.some((s) => s.id === session.id);
      const next = exists
        ? prev.map((s) => (s.id === session.id ? session : s))
        : [session, ...prev];
      saveSessions(next);
      return next;
    });
  }, []);

  return { sessions, upsertSession };
}
