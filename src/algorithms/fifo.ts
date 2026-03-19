import type { SimulationStep } from "../types";

export function simulateFIFO(reference: number[], frameCount: number): SimulationStep[] {
  const frames: Array<number | null> = Array(frameCount).fill(null);
  let faultCount = 0;
  let replacePointer = 0;

  return reference.map((requestedPage, idx) => {
    const existingIndex = frames.indexOf(requestedPage);

    if (existingIndex !== -1) {
      return {
        step: idx + 1,
        requestedPage,
        frames: [...frames],
        hit: true,
        fault: false,
        faultCount,
        accessedIndex: existingIndex,
        replacedIndex: null,
        replacedPage: null
      };
    }

    faultCount += 1;
    const emptyIndex = frames.indexOf(null);

    if (emptyIndex !== -1) {
      frames[emptyIndex] = requestedPage;
      return {
        step: idx + 1,
        requestedPage,
        frames: [...frames],
        hit: false,
        fault: true,
        faultCount,
        accessedIndex: emptyIndex,
        replacedIndex: null,
        replacedPage: null
      };
    }

    const replacedPage = frames[replacePointer];
    frames[replacePointer] = requestedPage;
    const replacedIndex = replacePointer;
    replacePointer = (replacePointer + 1) % frameCount;

    return {
      step: idx + 1,
      requestedPage,
      frames: [...frames],
      hit: false,
      fault: true,
      faultCount,
      accessedIndex: replacedIndex,
      replacedIndex,
      replacedPage
    };
  });
}
