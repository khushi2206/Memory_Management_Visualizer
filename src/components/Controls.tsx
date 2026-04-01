import type { AlgorithmName } from "../types";

interface ControlsProps {
  referenceInput: string;
  frameCount: number;
  selectedAlgorithm: AlgorithmName;
  autoPlay: boolean;
  speed: number;
  disabledWhileRunning: boolean;
  onReferenceChange: (value: string) => void;
  onFrameCountChange: (value: number) => void;
  onAlgorithmChange: (value: AlgorithmName) => void;
  onStart: () => void;
  onNext: () => void;
  onReset: () => void;
  onToggleAutoPlay: () => void;
  onSpeedChange: (value: number) => void;
}

export function Controls({
  referenceInput,
  frameCount,
  selectedAlgorithm,
  autoPlay,
  speed,
  disabledWhileRunning,
  onReferenceChange,
  onFrameCountChange,
  onAlgorithmChange,
  onStart,
  onNext,
  onReset,
  onToggleAutoPlay,
  onSpeedChange
}: ControlsProps) {
  return (
    <section className="panel controls-panel">
      <div className="panel-title-wrap">
        <h2>Simulation Controls</h2>
      </div>

      <div className="controls-grid">
        <label>
          Page reference string
          <input
            value={referenceInput}
            onChange={(event) => onReferenceChange(event.target.value)}
            placeholder="7,0,1,2,0,3,0,4,2,3"
          />
        </label>

        <label>
          Number of frames
          <input
            type="number"
            min={1}
            max={10}
            value={frameCount}
            onChange={(event) => onFrameCountChange(Number(event.target.value))}
          />
        </label>

        <label>
          Replacement algorithm
          <select
            value={selectedAlgorithm}
            onChange={(event) => onAlgorithmChange(event.target.value as AlgorithmName)}
          >
            <option value="FIFO">FIFO</option>
            <option value="LRU">LRU</option>
            <option value="Optimal">Optimal</option>
          </select>
        </label>
      </div>

      <div className="button-row">
        <button className="primary" onClick={onStart}>
          Start Simulation
        </button>
        <button onClick={onNext} disabled={disabledWhileRunning}>
          Next Step
        </button>
        <button onClick={onToggleAutoPlay}>{autoPlay ? "Pause" : "Auto Play"}</button>
        <button className="ghost" onClick={onReset}>
          Reset
        </button>
      </div>

      <div className="speed-row">
        <label htmlFor="speed">Animation speed: {speed} ms</label>
        <input
          id="speed"
          type="range"
          min={250}
          max={1800}
          step={50}
          value={speed}
          onChange={(event) => onSpeedChange(Number(event.target.value))}
        />
      </div>
    </section>
  );
}
