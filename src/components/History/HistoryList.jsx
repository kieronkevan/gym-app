import SessionRow from './SessionRow.jsx';

export default function HistoryList({ sessions, onOpenSession, onNewSession }) {
  return (
    <div className="max-w-sm mx-auto p-4">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-base font-medium">History</p>
          <button onClick={onNewSession} className="text-sm px-2.5 py-1 border border-gray-300 rounded-lg">
            + New
          </button>
        </div>

        {sessions.length === 0 && (
          <p className="text-sm text-gray-400 px-4 py-6">No sessions yet — hit New to log your first one.</p>
        )}

        {sessions.map((session) => (
          <SessionRow key={session.id} session={session} onOpen={() => onOpenSession(session)} />
        ))}
      </div>
    </div>
  );
}
