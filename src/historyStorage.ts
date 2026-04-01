import type { SimulationHistoryEntry } from "./types";

const STORAGE_KEY = "mmv-simulation-history";
const MAX_ENTRIES = 80;

function safeParse(raw: string | null): SimulationHistoryEntry[] {
  if (!raw) {
    return [];
  }
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) {
      return [];
    }
    return data.filter(
      (item): item is SimulationHistoryEntry =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        "at" in item &&
        "referenceInput" in item
    );
  } catch {
    return [];
  }
}

export function loadHistory(): SimulationHistoryEntry[] {
  return safeParse(localStorage.getItem(STORAGE_KEY)).sort((a, b) => b.at - a.at);
}

export function appendHistoryEntry(entry: SimulationHistoryEntry): void {
  const prev = loadHistory();
  const next = [entry, ...prev].slice(0, MAX_ENTRIES);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
