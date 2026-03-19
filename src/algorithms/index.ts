import { simulateFIFO } from "./fifo";
import { simulateLRU } from "./lru";
import { simulateOptimal } from "./optimal";
import type { AlgorithmName, SimulationStep } from "../types";

export function runSimulation(
  algorithm: AlgorithmName,
  reference: number[],
  frameCount: number
): SimulationStep[] {
  if (algorithm === "FIFO") {
    return simulateFIFO(reference, frameCount);
  }

  if (algorithm === "LRU") {
    return simulateLRU(reference, frameCount);
  }

  return simulateOptimal(reference, frameCount);
}
