import { useState } from 'react';
import { useUnit } from '../../context/UnitContext.jsx';
import { toDisplayWeight, fromDisplayWeight } from '../../lib/units.js';

export default function SetRow({ set, onEdit, onRemove }) {
  const { unit } = useUnit();
  const [editing, setEditing] = useState(false);
  const [reps, setReps] = useState(set.reps);
  const [weight, setWeight] = useState(toDisplayWeight(set.weightKg, unit));

  if (editing) {
    return (
      <div className="flex items-center gap-1.5">
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className="w-12 text-sm border border-gray-200 rounded px-1.5 py-1"
        />
        <span className="text-xs text-gray-400">×</span>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-14 text-sm border border-gray-200 rounded px-1.5 py-1"
        />
        <span className="text-xs text-gray-400">{unit}</span>
        <button
          onClick={() => {
            onEdit({ reps, weightKg: fromDisplayWeight(weight, unit) });
            setEditing(false);
          }}
          className="text-xs px-2 py-1 border border-gray-300 rounded"
        >
          Save
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-600">
        {set.reps} reps × {toDisplayWeight(set.weightKg, unit)} {unit}
      </p>
      <div className="flex">
        <button aria-label="Edit set" onClick={() => setEditing(true)} className="w-6 h-6 text-gray-400">
          ✎
        </button>
        <button aria-label="Remove set" onClick={onRemove} className="w-6 h-6 text-gray-400">
          ×
        </button>
      </div>
    </div>
  );
}
