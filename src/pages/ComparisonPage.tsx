import { AlgorithmRaceVisualization } from "../components/AlgorithmRaceVisualization";
import { ComparisonChart } from "../components/ComparisonChart";
import { Controls } from "../components/Controls";
import { useSimulation } from "../context/SimulationContext";

export function ComparisonPage() {
  const {
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
    comparisonData,
    startSimulation,
    nextStep,
    resetSimulation,
    toggleAutoPlay,
    setSpeed
  } = useSimulation();

  const disabledWhileRunning = steps.length === 0 || currentStepIndex >= steps.length - 1;

  return (
    <>
      <header className="hero">
        <h1>Comparison mode</h1>
        <p>
          Algorithm Comparison and Synchronized Algorithm Timeline: FIFO, LRU, and Optimal run in lockstep
          with your reference string. Use the same controls as on Home.
        </p>
      </header>

      <Controls
        referenceInput={referenceInput}
        frameCount={frameCount}
        selectedAlgorithm={selectedAlgorithm}
        autoPlay={autoPlay}
        speed={speed}
        disabledWhileRunning={disabledWhileRunning}
        onReferenceChange={setReferenceInput}
        onFrameCountChange={setFrameCount}
        onAlgorithmChange={setSelectedAlgorithm}
        onStart={startSimulation}
        onNext={nextStep}
        onReset={resetSimulation}
        onToggleAutoPlay={toggleAutoPlay}
        onSpeedChange={setSpeed}
      />

      {errorMessage.length > 0 ? <div className="error-banner">{errorMessage}</div> : null}

      <main className="comparison-page-main">
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
        ) : (
          <section className="panel">
            <p className="muted">
              Enter a valid page reference string and frame count (1–20), then start the simulation to see
              Algorithm Comparison and the Synchronized Algorithm Timeline.
            </p>
          </section>
        )}
      </main>
    </>
  );
}
