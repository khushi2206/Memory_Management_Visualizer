import { motion } from "framer-motion";
import type { SegmentBlock } from "../types";

const segments: SegmentBlock[] = [
  { name: "Code", sizePercent: 30, base: 1000, limit: 300, color: "var(--segment-code)" },
  { name: "Heap", sizePercent: 45, base: 1300, limit: 450, color: "var(--segment-heap)" },
  { name: "Stack", sizePercent: 25, base: 1750, limit: 250, color: "var(--segment-stack)" }
];

export function SegmentationVisualization() {
  return (
    <section className="panel">
      <h2>Segmentation View</h2>
      <p className="muted">Base address and limit per segment (Code, Heap, Stack).</p>

      <div className="segment-track">
        {segments.map((segment, index) => (
          <motion.div
            key={segment.name}
            className="segment-block"
            style={{
              width: `${segment.sizePercent}%`,
              background: segment.color
            }}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 * index, duration: 0.3 }}
          >
            <div className="segment-name">{segment.name}</div>
            <div className="segment-meta">Base: {segment.base}</div>
            <div className="segment-meta">Limit: {segment.limit}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
