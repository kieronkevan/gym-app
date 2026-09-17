function previewText(exercises) {
  const names = exercises.map((e) => e.name);
  if (names.length <= 2) return names.join(', ');
  return `${names.slice(0, 2).join(', ')} +${names.length - 2} more`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export default function SessionRow({ session, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="w-full text-left px-4 py-3 border-b border-gray-100 last:border-b-0"
    >
      <div className="flex justify-between">
        <p className="text-sm">{session.title || 'Untitled session'}</p>
        <p className="text-xs text-gray-400">{formatDate(session.date)}</p>
      </div>
      <p className="text-sm text-gray-500 mt-0.5">{previewText(session.exercises)}</p>
    </button>
  );
}
