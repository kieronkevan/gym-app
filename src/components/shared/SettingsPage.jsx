import UnitToggle from './UnitToggle.jsx';

export default function SettingsPage({ onBack }) {
  return (
    <div className="max-w-sm mx-auto p-4">
      <button onClick={onBack} className="text-xs text-gray-400 mb-3">
        ← History
      </button>
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <p className="text-base font-medium mb-3">Settings</p>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Weight unit</p>
          <UnitToggle />
        </div>
      </div>
    </div>
  );
}
