import { Controls } from "../components/Controls";
import { PagingVisualization } from "../components/PagingVisualization";
import { SegmentationVisualization } from "../components/SegmentationVisualization";
import { useSimulation } from "../context/SimulationContext";

export function HomePage() {
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
    currentStep,
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
        <h1>Memory Management Visualizer</h1>
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

      <main className="main-layout">
        <div className="paging-section">
          <PagingVisualization
            currentStep={currentStep}
            totalSteps={steps.length}
            visibleStepIndex={Math.max(currentStepIndex + 1, 0)}
          />
        </div>

        <div className="content-grid content-grid--below">
          <SegmentationVisualization />
        </div>
      </main>
    </>
  );
}
