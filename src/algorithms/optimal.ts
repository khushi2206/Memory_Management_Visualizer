import type { SimulationStep } from "../types";

export function simulateOptimal(reference: number[], frameCount: number): SimulationStep[] {
  const frames: Array<number | null> = Array(frameCount).fill(null);
  let faultCount = 0;

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

    let victimIndex = 0;
    let farthestUse = -1;

    for (let frameIndex = 0; frameIndex < frameCount; frameIndex += 1) {
      const page = frames[frameIndex] as number;
      const futureIndex = reference.slice(idx + 1).indexOf(page);

      if (futureIndex === -1) {
        victimIndex = frameIndex;
        farthestUse = Number.POSITIVE_INFINITY;
        break;
      }

      const absoluteFutureIndex = idx + 1 + futureIndex;
      if (absoluteFutureIndex > farthestUse) {
        farthestUse = absoluteFutureIndex;
        victimIndex = frameIndex;
      }
    }

    const replacedPage = frames[victimIndex];
    frames[victimIndex] = requestedPage;

    return {
      step: idx + 1,
      requestedPage,
      frames: [...frames],
      hit: false,
      fault: true,
      faultCount,
      accessedIndex: victimIndex,
      replacedIndex: victimIndex,
      replacedPage
    };
  });
}
