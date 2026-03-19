import { AnimatePresence, motion } from "framer-motion";

interface MemoryBoxProps {
  frameIndex: number;
  page: number | null;
  isHit: boolean;
  isFault: boolean;
  isReplaced: boolean;
}

export function MemoryBox({ frameIndex, page, isHit, isFault, isReplaced }: MemoryBoxProps) {
  const stateClass = isHit
    ? "frame frame-hit"
    : isFault
      ? "frame frame-fault"
      : isReplaced
        ? "frame frame-replaced"
        : "frame";

  return (
    <div className={stateClass}>
      <div className="frame-label">Frame {frameIndex}</div>
      <AnimatePresence mode="wait">
        <motion.div
          key={page === null ? `empty-${frameIndex}` : `page-${frameIndex}-${page}`}
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.78 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="frame-content"
        >
          {page === null ? <span className="frame-empty">Empty</span> : <span className="page-chip">{page}</span>}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
