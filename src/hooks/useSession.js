import { useState, useCallback, useRef } from 'react';

function newId() {
  return Math.random().toString(36).slice(2, 10);
}

function todayIso() {
  return new Date().toISOString();
}

// existingSession: pass a saved session to reopen it for editing later in
// the day; omit it to start a genuinely blank page.
export function useSession(existingSession, onSave) {
  const [id] = useState(() => existingSession?.id ?? newId());
  const [date] = useState(() => existingSession?.date ?? todayIso());
  const [title, setTitle] = useState(existingSession?.title ?? '');
  const [exercises, setExercises] = useState(existingSession?.exercises ?? []);

  // Tracks whether this session has ever had an exercise, so we only
  // start persisting to history once it's actually worth keeping.
  const hasSavedRef = useRef(Boolean(existingSession));

  const commit = useCallback(
    (nextExercises, nextTitle) => {
      const shouldSave = hasSavedRef.current || nextExercises.length > 0;
      if (!shouldSave) return;
      hasSavedRef.current = true;
      onSave({ id, date, title: nextTitle, exercises: nextExercises });
    },
    [id, date, onSave]
  );

  const addExercise = useCallback(
    (exerciseDef) => {
      setExercises((prev) => {
        const next = [...prev, { exerciseId: exerciseDef.id, name: exerciseDef.name, sets: [] }];
        commit(next, title);
        return next;
      });
    },
    [commit, title]
  );

  const renameExercise = useCallback(
    (index, exerciseDef) => {
      setExercises((prev) => {
        const next = prev.map((ex, i) =>
          i === index ? { ...ex, exerciseId: exerciseDef.id, name: exerciseDef.name } : ex
        );
        commit(next, title);
        return next;
      });
    },
    [commit, title]
  );

  const removeExercise = useCallback(
    (index) => {
      setExercises((prev) => {
        const next = prev.filter((_, i) => i !== index);
        commit(next, title);
        return next;
      });
    },
    [commit, title]
  );

  const addSet = useCallback(
    (exerciseIndex, set) => {
      setExercises((prev) => {
        const next = prev.map((ex, i) =>
          i === exerciseIndex ? { ...ex, sets: [...ex.sets, { id: newId(), ...set }] } : ex
        );
        commit(next, title);
        return next;
      });
    },
    [commit, title]
  );

  const editSet = useCallback(
    (exerciseIndex, setId, patch) => {
      setExercises((prev) => {
        const next = prev.map((ex, i) =>
          i === exerciseIndex
            ? { ...ex, sets: ex.sets.map((s) => (s.id === setId ? { ...s, ...patch } : s)) }
            : ex
        );
        commit(next, title);
        return next;
      });
    },
    [commit, title]
  );

  const removeSet = useCallback(
    (exerciseIndex, setId) => {
      setExercises((prev) => {
        const next = prev.map((ex, i) =>
          i === exerciseIndex ? { ...ex, sets: ex.sets.filter((s) => s.id !== setId) } : ex
        );
        commit(next, title);
        return next;
      });
    },
    [commit, title]
  );

  const updateTitle = useCallback(
    (value) => {
      setTitle(value);
      commit(exercises, value);
    },
    [commit, exercises]
  );

  return {
    id,
    date,
    title,
    exercises,
    setTitle: updateTitle,
    addExercise,
    renameExercise,
    removeExercise,
    addSet,
    editSet,
    removeSet,
  };
}
