import { useState } from 'react';
import { UnitProvider } from './context/UnitContext.jsx';
import { useHistory } from './hooks/useHistory.js';
import HistoryList from './components/History/HistoryList.jsx';
import SessionPage from './components/SessionPage/SessionPage.jsx';
import SettingsPage from './components/shared/SettingsPage.jsx';

export default function App() {
  const { sessions, upsertSession } = useHistory();
  const [view, setView] = useState({ name: 'history' });

  return (
    <UnitProvider>
      <div className="min-h-screen py-6">
        <div className="max-w-sm mx-auto px-4 flex justify-end">
          <button
            onClick={() => setView({ name: 'settings' })}
            className="text-xs text-gray-400 mb-2"
          >
            Settings
          </button>
        </div>

        {view.name === 'history' && (
          <HistoryList
            sessions={sessions}
            onOpenSession={(session) => setView({ name: 'session', session })}
            onNewSession={() => setView({ name: 'session', session: null })}
          />
        )}

        {view.name === 'session' && (
          <SessionPage
            existingSession={view.session}
            onSave={upsertSession}
            onBack={() => setView({ name: 'history' })}
          />
        )}

        {view.name === 'settings' && <SettingsPage onBack={() => setView({ name: 'history' })} />}
      </div>
    </UnitProvider>
  );
}
