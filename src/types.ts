export type AlgorithmName = "FIFO" | "LRU" | "Optimal";

export interface SimulationHistoryEntry {
  id: string;
  at: number;
  referenceInput: string;
  frameCount: number;
  selectedAlgorithm: AlgorithmName;
  faultsByAlgorithm: Record<AlgorithmName, number>;
  stepCount: number;
}

export interface SimulationStep {
  step: number;
  requestedPage: number;
  frames: Array<number | null>;
  hit: boolean;
  fault: boolean;
  faultCount: number;
  accessedIndex: number | null;
  replacedIndex: number | null;
  replacedPage: number | null;
}

export interface SegmentBlock {
  name: "Code" | "Heap" | "Stack";
  sizePercent: number;
  base: number;
  limit: number;
  color: string;
}
