import { motion } from "framer-motion";
import type { SimulationStep } from "../types";
import { MemoryBox } from "./MemoryBox";

interface PagingVisualizationProps {
  currentStep: SimulationStep | null;
  totalSteps: number;
  visibleStepIndex: number;
}

export function PagingVisualization({
  currentStep,
  totalSteps,
  visibleStepIndex
}: PagingVisualizationProps) {
  if (!currentStep) {
    return (
      <section className="panel paging-visualizer">
        <h2>Paging Visualizer</h2>
        <p className="muted">Press Start Simulation to begin step-by-step playback.</p>
      </section>
    );
  }

  return (
    <section className="panel paging-visualizer">
      <div className="panel-title-wrap">
        <h2>Paging Visualizer</h2>
        <div className="step-pill">Step {visibleStepIndex} / {totalSteps}</div>
      </div>

      <div className="current-request">
        Current request: <strong>{currentStep.requestedPage}</strong>
      </div>

      <motion.div
        className="frames-row"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.06
            }
          }
        }}
      >
        {currentStep.frames.map((page, index) => (
          <motion.div
            key={`frame-${index}`}
            variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
          >
            <MemoryBox
              frameIndex={index}
              page={page}
              isHit={currentStep.hit && currentStep.accessedIndex === index}
              isFault={currentStep.fault && currentStep.accessedIndex === index}
              isReplaced={currentStep.replacedIndex === index}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="status-row">
        <span className={currentStep.hit ? "status-hit" : "status-fault"}>
          {currentStep.hit ? "Page Hit" : "Page Fault"}
        </span>
        <span>Total Faults: {currentStep.faultCount}</span>
        <span>
          Replaced: {currentStep.replacedPage === null ? "None" : `${currentStep.replacedPage} -> ${currentStep.requestedPage}`}
        </span>
      </div>
    </section>
  );
}
