import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { runSimulation } from "../algorithms";
import { appendHistoryEntry } from "../historyStorage";
import type { AlgorithmName, SimulationHistoryEntry, SimulationStep } from "../types";

const DEFAULT_REFERENCE = "7,0,1,2,0,3,0,4,2,3,0,3,2";

function parseReferenceString(referenceInput: string): number[] {
  return referenceInput
    .split(",")
    .map((token) => token.trim())
    .filter((token) => token.length > 0)
    .map((token) => Number(token))
    .filter((value) => Number.isFinite(value));
}

function getFaultCount(steps: SimulationStep[]): number {
  if (steps.length === 0) {
    return 0;
  }
  return steps[steps.length - 1].faultCount;
}

interface SimulationContextValue {
  referenceInput: string;
  setReferenceInput: (value: string) => void;
  frameCount: number;
  setFrameCount: (value: number) => void;
  selectedAlgorithm: AlgorithmName;
  setSelectedAlgorithm: (value: AlgorithmName) => void;
  steps: SimulationStep[];
  currentStepIndex: number;
  autoPlay: boolean;
  speed: number;
  errorMessage: string;
  parsedReference: number[];
  currentStep: SimulationStep | null;
  comparisonData: {
    fifoSteps: SimulationStep[];
    lruSteps: SimulationStep[];
    optimalSteps: SimulationStep[];
    fifoFaults: number;
    lruFaults: number;
    optimalFaults: number;
  } | null;
  startSimulation: () => void;
  nextStep: () => void;
  resetSimulation: () => void;
  toggleAutoPlay: () => void;
  setSpeed: (value: number) => void;
}

const SimulationContext = createContext<SimulationContextValue | null>(null);

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [referenceInput, setReferenceInput] = useState(DEFAULT_REFERENCE);
  const [frameCount, setFrameCount] = useState(3);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmName>("FIFO");
  const [steps, setSteps] = useState<SimulationStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [autoPlay, setAutoPlay] = useState(false);
  const [speed, setSpeed] = useState(700);
  const [errorMessage, setErrorMessage] = useState("");

  const parsedReference = useMemo(() => parseReferenceString(referenceInput), [referenceInput]);

  useEffect(() => {
    if (!autoPlay || steps.length === 0) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          window.clearInterval(timer);
          setAutoPlay(false);
          return prev;
        }

        return prev + 1;
      });
    }, speed);

    return () => window.clearInterval(timer);
  }, [autoPlay, steps, speed]);

  const currentStep = currentStepIndex >= 0 ? steps[currentStepIndex] : null;

  const comparisonData = useMemo(() => {
    if (parsedReference.length === 0 || frameCount < 1) {
      return null;
    }

    const fifoSteps = runSimulation("FIFO", parsedReference, frameCount);
    const lruSteps = runSimulation("LRU", parsedReference, frameCount);
    const optimalSteps = runSimulation("Optimal", parsedReference, frameCount);

    return {
      fifoSteps,
      lruSteps,
      optimalSteps,
      fifoFaults: getFaultCount(fifoSteps),
      lruFaults: getFaultCount(lruSteps),
      optimalFaults: getFaultCount(optimalSteps)
    };
  }, [parsedReference, frameCount]);

  const recordHistory = useCallback(
    (outputSteps: SimulationStep[]) => {
      if (!comparisonData || parsedReference.length === 0) {
        return;
      }
      const entry: SimulationHistoryEntry = {
        id: crypto.randomUUID(),
        at: Date.now(),
        referenceInput,
        frameCount,
        selectedAlgorithm,
        faultsByAlgorithm: {
          FIFO: comparisonData.fifoFaults,
          LRU: comparisonData.lruFaults,
          Optimal: comparisonData.optimalFaults
        },
        stepCount: outputSteps.length
      };
      appendHistoryEntry(entry);
    },
    [comparisonData, frameCount, parsedReference.length, referenceInput, selectedAlgorithm]
  );

  const startSimulation = useCallback(() => {
    if (parsedReference.length === 0) {
      setErrorMessage("Please enter a valid comma-separated reference string.");
      return;
    }

    if (frameCount < 1 || frameCount > 20) {
      setErrorMessage("Frame count must be between 1 and 20.");
      return;
    }

    setErrorMessage("");
    const outputSteps = runSimulation(selectedAlgorithm, parsedReference, frameCount);
    setSteps(outputSteps);
    setCurrentStepIndex(0);
    setAutoPlay(false);
    recordHistory(outputSteps);
  }, [frameCount, parsedReference, recordHistory, selectedAlgorithm]);

  const nextStep = useCallback(() => {
    setCurrentStepIndex((prev) => {
      if (steps.length === 0) {
        return -1;
      }
      return Math.min(prev + 1, steps.length - 1);
    });
  }, [steps]);

  const resetSimulation = useCallback(() => {
    setSteps([]);
    setCurrentStepIndex(-1);
    setAutoPlay(false);
    setErrorMessage("");
  }, []);

  const toggleAutoPlay = useCallback(() => {
    if (steps.length === 0) {
      return;
    }

    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
    }

    setAutoPlay((prev) => !prev);
  }, [currentStepIndex, steps.length]);

  const value = useMemo<SimulationContextValue>(
    () => ({
      referenceInput,
      setReferenceInput,
      frameCount,
      setFrameCount,
      selectedAlgorithm,
      setSelectedAlgorithm,
      steps,
      currentStepIndex,
      autoPlay,
      speed,
      errorMessage,
      parsedReference,
      currentStep,
      comparisonData,
      startSimulation,
      nextStep,
      resetSimulation,
      toggleAutoPlay,
      setSpeed
    }),
    [
      referenceInput,
      frameCount,
      selectedAlgorithm,
      steps,
      currentStepIndex,
      autoPlay,
      speed,
      errorMessage,
      parsedReference,
      currentStep,
      comparisonData,
      startSimulation,
      nextStep,
      resetSimulation,
      toggleAutoPlay
    ]
  );

  return <SimulationContext.Provider value={value}>{children}</SimulationContext.Provider>;
}

export function useSimulation(): SimulationContextValue {
  const ctx = useContext(SimulationContext);
  if (!ctx) {
    throw new Error("useSimulation must be used within SimulationProvider");
  }
  return ctx;
}
