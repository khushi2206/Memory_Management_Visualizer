export type AlgorithmName = "FIFO" | "LRU" | "Optimal";

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
