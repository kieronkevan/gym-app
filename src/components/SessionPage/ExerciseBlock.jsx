import { useState } from 'react';
import SetRow from './SetRow.jsx';
import SetForm from './SetForm.jsx';
import ExercisePicker from './ExercisePicker.jsx';

export default function ExerciseBlock({ exercise, onRename, onRemove, onAddSet, onEditSet, onRemoveSet }) {
  const [showAddSet, setShowAddSet] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{exercise.name}</p>
        <div className="flex gap-0.5">
          <button
            aria-label="Change exercise"
            onClick={() => setShowPicker((v) => !v)}
            className="w-6 h-6 text-gray-400"
          >
            ✎
          </button>
          <button aria-label="Remove exercise" onClick={onRemove} className="w-6 h-6 text-gray-400">
            🗑
          </button>
        </div>
      </div>

      {showPicker && (
        <ExercisePicker
          onSelect={(def) => onRename(def)}
          onClose={() => setShowPicker(false)}
        />
      )}

      <div className="flex flex-col gap-1 mt-1">
        {exercise.sets.map((set) => (
          <SetRow
            key={set.id}
            set={set}
            onEdit={(patch) => onEditSet(set.id, patch)}
            onRemove={() => onRemoveSet(set.id)}
          />
        ))}
      </div>

      <button
        onClick={() => setShowAddSet((v) => !v)}
        className="mt-1.5 text-xs px-2 py-1 border border-gray-300 rounded"
      >
        + Add set
      </button>

      {showAddSet && (
        <SetForm
          onAdd={(set) => {
            onAddSet(set);
            setShowAddSet(false);
          }}
        />
      )}
    </div>
  );
}
