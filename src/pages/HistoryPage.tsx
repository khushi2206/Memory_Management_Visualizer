import { useState } from "react";
import { clearHistory, loadHistory } from "../historyStorage";
import type { AlgorithmName } from "../types";

function formatTime(at: number): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(new Date(at));
  } catch {
    return new Date(at).toLocaleString();
  }
}

export function HistoryPage() {
  const [entries, setEntries] = useState(() => loadHistory());

  const refresh = () => setEntries(loadHistory());

  const handleClear = () => {
    if (entries.length === 0) {
      return;
    }
    if (window.confirm("Clear all history log entries?")) {
      clearHistory();
      refresh();
    }
  };

  return (
    <>
      <header className="hero hero--compact">
        <div className="hero-history-head">
          <div>
            <h1>History log</h1>
            <p className="hero-history-sub">
              Past simulation runs: reference string, frames, page faults per algorithm, and when each run was
              recorded (saved when you press Start Simulation).
            </p>
          </div>
          <button type="button" className="ghost history-clear-btn" onClick={handleClear} disabled={entries.length === 0}>
            Clear all
          </button>
        </div>
      </header>

      <main className="history-main">
        {entries.length === 0 ? (
          <section className="panel">
            <p className="muted">No entries yet. Run a simulation from Home or Comparison mode to build your log.</p>
          </section>
        ) : (
          <ul className="history-list">
            {entries.map((entry) => (
              <li key={entry.id} className="panel history-card">
                <div className="history-card-top">
                  <span className="history-time">{formatTime(entry.at)}</span>
                  <span className="history-meta">
                    Frames: <strong>{entry.frameCount}</strong> · Steps: <strong>{entry.stepCount}</strong> · Selected:{" "}
                    <strong>{entry.selectedAlgorithm}</strong>
                  </span>
                </div>
                <div className="history-ref">
                  <span className="history-ref-label">Reference string</span>
                  <code className="history-ref-value">{entry.referenceInput}</code>
                </div>
                <div className="history-faults-grid">
                  {(["FIFO", "LRU", "Optimal"] as AlgorithmName[]).map((name) => (
                    <div key={name} className="history-fault-cell">
                      <span className="history-fault-name">{name}</span>
                      <span className="history-fault-num">{entry.faultsByAlgorithm?.[name] ?? "—"}</span>
                      <span className="history-fault-cap">page faults</span>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
