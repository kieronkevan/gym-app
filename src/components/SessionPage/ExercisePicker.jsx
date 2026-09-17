import { useState } from 'react';
import { searchExercises } from '../../lib/exercises.js';

export default function ExercisePicker({ onSelect, onClose }) {
  const [query, setQuery] = useState('');
  const results = searchExercises(query);

  return (
    <div className="mt-2 border border-gray-200 rounded-lg p-2">
      <input
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search exercises"
        className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 mb-1.5 focus:outline-none"
      />
      <div className="flex flex-col max-h-48 overflow-y-auto">
        {results.length === 0 && (
          <p className="text-xs text-gray-400 px-1 py-2">No matches</p>
        )}
        {results.map((exercise) => (
          <button
            key={exercise.id}
            onClick={() => {
              onSelect(exercise);
              onClose();
            }}
            className="text-left text-sm px-1.5 py-1.5 hover:bg-gray-50 rounded"
          >
            {exercise.name}
          </button>
        ))}
      </div>
    </div>
  );
}
