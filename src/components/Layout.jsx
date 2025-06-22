// client/src/components/Layout.jsx
import { useState, useMemo } from "react";

// A helper function to format dates nicely
const formatDate = (isoString) => {
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const Sidebar = ({ sessions, onSessionSelect, activeSessionId }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSessions = useMemo(() => {
    if (!searchTerm.trim()) return sessions;
    return sessions.filter((session) =>
      session.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sessions, searchTerm]);

  return (
    <aside className="w-80 flex-shrink-0 bg-slate-800 text-slate-200 flex flex-col h-screen">
      <div className="p-4 border-b border-slate-700">
        <h1 className="text-2xl font-bold tracking-wide text-white">
          AI Quiz Gen
        </h1>
      </div>

      <div className="p-4 border-b border-slate-700">
        <input
          type="search"
          placeholder="Search history..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 bg-slate-700 rounded-md placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 p-4 pt-2">
          {filteredSessions.map((session) => {
            // THE FIX #2: The comparison is now simple and direct.
            const isActive = activeSessionId === session.id;
            return (
              <li key={session.id}>
                <button
                  onClick={() => onSessionSelect(session)}
                  className={`w-full text-left px-3 py-3 rounded-md transition-colors duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white font-semibold"
                      : "hover:bg-slate-700"
                  }`}
                >
                  <p className="font-medium truncate">{session.title}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isActive ? "text-indigo-200" : "text-slate-400"
                    }`}
                  >
                    {formatDate(session.timestamp)}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

// Main Layout component
const Layout = ({ children, sessions, onSessionSelect, activeSessionId }) => {
  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900 font-sans">
      {/* THE FIX #3: Pass only the necessary props down to the Sidebar */}
      <Sidebar
        sessions={sessions}
        onSessionSelect={onSessionSelect}
        activeSessionId={activeSessionId}
      />
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
