import { useState } from 'react';
import { useSession } from '../../hooks/useSession.js';
import TitleInput from './TitleInput.jsx';
import ExerciseBlock from './ExerciseBlock.jsx';
import ExercisePicker from './ExercisePicker.jsx';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export default function SessionPage({ existingSession, onSave, onBack }) {
  const session = useSession(existingSession, onSave);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="max-w-sm mx-auto p-4">
      <button onClick={onBack} className="text-xs text-gray-400 mb-3">
        ← History
      </button>

      <div className="bg-white border border-gray-200 rounded-xl p-4 min-h-[320px]">
        <TitleInput value={session.title} onChange={session.setTitle} />
        <p className="text-xs text-gray-400 mb-4">{formatDate(session.date)}</p>

        <div className="flex flex-col gap-5">
          {session.exercises.map((exercise, index) => (
            <ExerciseBlock
              key={exercise.exerciseId + index}
              exercise={exercise}
              onRename={(def) => session.renameExercise(index, def)}
              onRemove={() => session.removeExercise(index)}
              onAddSet={(set) => session.addSet(index, set)}
              onEditSet={(setId, patch) => session.editSet(index, setId, patch)}
              onRemoveSet={(setId) => session.removeSet(index, setId)}
            />
          ))}
        </div>

        <button
          onClick={() => setShowPicker((v) => !v)}
          className="mt-6 text-sm px-3 py-1.5 border border-gray-300 rounded-lg"
        >
          + Add exercise
        </button>

        {showPicker && (
          <ExercisePicker
            onSelect={(def) => session.addExercise(def)}
            onClose={() => setShowPicker(false)}
          />
        )}
      </div>
    </div>
  );
}
