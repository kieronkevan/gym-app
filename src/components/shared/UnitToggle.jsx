import { useUnit } from '../../context/UnitContext.jsx';

export default function UnitToggle() {
  const { unit, setUnit } = useUnit();

  return (
    <div className="flex gap-1">
      <button
        onClick={() => setUnit('kg')}
        className={`px-2 py-1 text-xs rounded border ${
          unit === 'kg' ? 'opacity-100 border-gray-400' : 'opacity-50 border-gray-200'
        }`}
      >
        kg
      </button>
      <button
        onClick={() => setUnit('lb')}
        className={`px-2 py-1 text-xs rounded border ${
          unit === 'lb' ? 'opacity-100 border-gray-400' : 'opacity-50 border-gray-200'
        }`}
      >
        lb
      </button>
    </div>
  );
}
