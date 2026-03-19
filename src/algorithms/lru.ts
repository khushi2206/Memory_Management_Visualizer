import type { SimulationStep } from "../types";

export function simulateLRU(reference: number[], frameCount: number): SimulationStep[] {
  const frames: Array<number | null> = Array(frameCount).fill(null);
  const lastUsedAtStep: number[] = Array(frameCount).fill(-1);
  let faultCount = 0;

  return reference.map((requestedPage, idx) => {
    const existingIndex = frames.indexOf(requestedPage);

    if (existingIndex !== -1) {
      lastUsedAtStep[existingIndex] = idx;
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
      lastUsedAtStep[emptyIndex] = idx;
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

    let lruIndex = 0;
    for (let frameIndex = 1; frameIndex < frameCount; frameIndex += 1) {
      if (lastUsedAtStep[frameIndex] < lastUsedAtStep[lruIndex]) {
        lruIndex = frameIndex;
      }
    }

    const replacedPage = frames[lruIndex];
    frames[lruIndex] = requestedPage;
    lastUsedAtStep[lruIndex] = idx;

    return {
      step: idx + 1,
      requestedPage,
      frames: [...frames],
      hit: false,
      fault: true,
      faultCount,
      accessedIndex: lruIndex,
      replacedIndex: lruIndex,
      replacedPage
    };
  });
}
