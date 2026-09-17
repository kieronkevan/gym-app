import { useState } from 'react';
import { useUnit } from '../../context/UnitContext.jsx';
import { fromDisplayWeight } from '../../lib/units.js';

export default function SetForm({ onAdd }) {
  const { unit } = useUnit();
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [error, setError] = useState('');

  function submit() {
    if (!reps || !weight) {
      setError('Enter reps and weight first.');
      return;
    }
    onAdd({ reps, weightKg: fromDisplayWeight(weight, unit) });
    setReps('');
    setWeight('');
    setError('');
  }

  return (
    <div className="mt-1.5">
      <div className="flex items-center gap-1.5">
        <input
          type="number"
          placeholder="reps"
          value={reps}
          onChange={(e) => {
            setReps(e.target.value);
            setError('');
          }}
          className="w-14 text-sm border border-gray-200 rounded px-1.5 py-1"
        />
        <span className="text-xs text-gray-400">×</span>
        <input
          type="number"
          placeholder="weight"
          value={weight}
          onChange={(e) => {
            setWeight(e.target.value);
            setError('');
          }}
          className="w-16 text-sm border border-gray-200 rounded px-1.5 py-1"
        />
        <span className="text-xs text-gray-400">{unit}</span>
        <button onClick={submit} className="text-xs px-2.5 py-1 border border-gray-300 rounded">
          Add
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
