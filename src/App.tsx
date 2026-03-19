import { useEffect, useMemo, useState } from "react";
import { Controls } from "./components/Controls";
import { PagingVisualization } from "./components/PagingVisualization";
import { SegmentationVisualization } from "./components/SegmentationVisualization";
import { ComparisonChart } from "./components/ComparisonChart";
import { AlgorithmRaceVisualization } from "./components/AlgorithmRaceVisualization";
import { runSimulation } from "./algorithms";
import type { AlgorithmName, SimulationStep } from "./types";

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

export default function App() {
  const [referenceInput, setReferenceInput] = useState(DEFAULT_REFERENCE);
  const [frameCount, setFrameCount] = useState(3);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmName>("FIFO");
  const [steps, setSteps] = useState<SimulationStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [autoPlay, setAutoPlay] = useState(false);
  const [speed, setSpeed] = useState(700);
  const [comparisonMode, setComparisonMode] = useState(false);
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
    if (!comparisonMode || parsedReference.length === 0 || frameCount < 1) {
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
  }, [comparisonMode, parsedReference, frameCount]);

  const startSimulation = () => {
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
  };

  const nextStep = () => {
    setCurrentStepIndex((prev) => {
      if (steps.length === 0) {
        return -1;
      }
      return Math.min(prev + 1, steps.length - 1);
    });
  };

  const resetSimulation = () => {
    setSteps([]);
    setCurrentStepIndex(-1);
    setAutoPlay(false);
    setErrorMessage("");
  };

  const toggleAutoPlay = () => {
    if (steps.length === 0) {
      return;
    }

    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
    }

    setAutoPlay((prev) => !prev);
  };

  return (
    <div className="app-shell">
      <div className="background-orb orb-1" />
      <div className="background-orb orb-2" />

      <header className="hero">
        <h1>Operating System Memory Management Visualizer</h1>
        <p>
          Explore paging behavior, compare replacement policies, and present segmentation
          concepts with polished step-by-step animations.
        </p>
      </header>

      <Controls
        referenceInput={referenceInput}
        frameCount={frameCount}
        selectedAlgorithm={selectedAlgorithm}
        autoPlay={autoPlay}
        speed={speed}
        comparisonMode={comparisonMode}
        disabledWhileRunning={steps.length === 0 || currentStepIndex >= steps.length - 1}
        onReferenceChange={setReferenceInput}
        onFrameCountChange={setFrameCount}
        onAlgorithmChange={setSelectedAlgorithm}
        onStart={startSimulation}
        onNext={nextStep}
        onReset={resetSimulation}
        onToggleAutoPlay={toggleAutoPlay}
        onSpeedChange={setSpeed}
        onToggleComparisonMode={() => setComparisonMode((prev) => !prev)}
      />

      {errorMessage.length > 0 ? <div className="error-banner">{errorMessage}</div> : null}

      <main className="content-grid">
        <PagingVisualization
          currentStep={currentStep}
          totalSteps={steps.length}
          visibleStepIndex={Math.max(currentStepIndex + 1, 0)}
        />

        <SegmentationVisualization />

        {comparisonData ? (
          <>
            <ComparisonChart
              fifoFaults={comparisonData.fifoFaults}
              lruFaults={comparisonData.lruFaults}
              optimalFaults={comparisonData.optimalFaults}
            />
            <AlgorithmRaceVisualization
              selectedAlgorithm={selectedAlgorithm}
              currentStepIndex={currentStepIndex}
              totalSteps={comparisonData.fifoSteps.length}
              fifoSteps={comparisonData.fifoSteps}
              lruSteps={comparisonData.lruSteps}
              optimalSteps={comparisonData.optimalSteps}
            />
          </>
        ) : null}
      </main>
    </div>
  );
}
