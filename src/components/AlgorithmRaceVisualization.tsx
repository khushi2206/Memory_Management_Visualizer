import { motion } from "framer-motion";
import type { AlgorithmName, SimulationStep } from "../types";

interface AlgorithmRaceVisualizationProps {
  selectedAlgorithm: AlgorithmName;
  currentStepIndex: number;
  totalSteps: number;
  fifoSteps: SimulationStep[];
  lruSteps: SimulationStep[];
  optimalSteps: SimulationStep[];
}

const algorithmOrder: AlgorithmName[] = ["FIFO", "LRU", "Optimal"];

function getStatusLabel(step: SimulationStep): string {
  return step.hit ? "Hit" : "Fault";
}

function getStatusClass(step: SimulationStep): string {
  return step.hit ? "status-hit" : "status-fault";
}

function getStepForIndex(steps: SimulationStep[], currentStepIndex: number): SimulationStep | null {
  if (currentStepIndex < 0 || steps.length === 0) {
    return null;
  }

  return steps[Math.min(currentStepIndex, steps.length - 1)];
}

export function AlgorithmRaceVisualization({
  selectedAlgorithm,
  currentStepIndex,
  totalSteps,
  fifoSteps,
  lruSteps,
  optimalSteps
}: AlgorithmRaceVisualizationProps) {
  const stepsByAlgorithm: Record<AlgorithmName, SimulationStep[]> = {
    FIFO: fifoSteps,
    LRU: lruSteps,
    Optimal: optimalSteps
  };

  const hasStarted = currentStepIndex >= 0;

  return (
    <section className="panel full-span">
      <div className="panel-title-wrap">
        <h2>Synchronized Algorithm Timeline</h2>
        <div className="step-pill">Step {Math.max(currentStepIndex + 1, 0)} / {totalSteps}</div>
      </div>

      <p className="muted">
        Every click on Next Step or Auto Play advances FIFO, LRU, and Optimal together.
      </p>

      <div className="race-grid">
        {algorithmOrder.map((algorithm, index) => {
          const algorithmSteps = stepsByAlgorithm[algorithm];
          const step = getStepForIndex(algorithmSteps, currentStepIndex);

          return (
            <motion.article
              key={algorithm}
              className={`race-card ${selectedAlgorithm === algorithm ? "race-card-selected" : ""}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.25 }}
            >
              <div className="race-title-row">
                <h3>{algorithm}</h3>
                {step ? (
                  <span className={getStatusClass(step)}>{getStatusLabel(step)}</span>
                ) : (
                  <span className="race-waiting">Waiting</span>
                )}
              </div>

              <div className="race-faults">
                Faults so far: <strong>{step ? step.faultCount : 0}</strong>
              </div>

              <div className="race-frames-row">
                {(step?.frames ?? Array(algorithmSteps[0]?.frames.length ?? 0).fill(null)).map((page, frameIndex) => (
                  <div
                    key={`${algorithm}-frame-${frameIndex}`}
                    className={`race-frame ${step?.accessedIndex === frameIndex ? (step.hit ? "race-hit" : "race-fault") : ""}`}
                  >
                    <div className="race-frame-label">F{frameIndex}</div>
                    <div className="race-page-chip">{page === null ? "-" : page}</div>
                  </div>
                ))}
              </div>

              {step ? (
                <div className="race-replaced">
                  Replaced: {step.replacedPage === null ? "None" : `${step.replacedPage} -> ${step.requestedPage}`}
                </div>
              ) : (
                <div className="race-replaced">Press Start Simulation to begin.</div>
              )}
            </motion.article>
          );
        })}
      </div>

      {!hasStarted ? <p className="muted">Start simulation to drive the synchronized timeline.</p> : null}
    </section>
  );
}
