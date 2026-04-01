/** Inline SVG diagrams for the Q&As / algorithms reference page. */

const stroke = "rgba(130, 180, 255, 0.85)";
const fillPanel = "rgba(56, 189, 248, 0.12)";
const accent = "#38bdf8";
const muted = "rgba(143, 163, 196, 0.9)";
const hit = "#34d399";

export function FifoDiagram() {
  return (
    <svg className="qa-diagram-svg" viewBox="0 0 420 200" role="img" aria-label="FIFO circular pointer across frames">
      <title>FIFO replacement pointer</title>
      <text x="210" y="22" textAnchor="middle" fill={muted} fontSize="12" fontWeight="700" fontFamily="Sora, sans-serif">
        Oldest page is replaced next (circular order)
      </text>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${60 + i * 120}, 70)`}>
          <rect x={0} y={0} width={72} height={88} rx={10} fill={fillPanel} stroke={stroke} strokeWidth={1.5} />
          <text x={36} y={38} textAnchor="middle" fill={accent} fontSize="22" fontWeight="800" fontFamily="Space Grotesk, sans-serif">
            {i === 0 ? "A" : i === 1 ? "B" : "C"}
          </text>
          <text x={36} y={62} textAnchor="middle" fill={muted} fontSize="10" fontWeight="700" fontFamily="Sora, sans-serif">
            F{i}
          </text>
        </g>
      ))}
      <path
        d="M 96 168 A 130 130 0 0 1 336 168"
        fill="none"
        stroke={accent}
        strokeWidth={2}
        strokeDasharray="6 4"
        markerEnd="url(#arrowFifo)"
      />
      <defs>
        <marker id="arrowFifo" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={accent} />
        </marker>
      </defs>
      <text x="210" y="188" textAnchor="middle" fill={accent} fontSize="11" fontWeight="700" fontFamily="Sora, sans-serif">
        Next victim →
      </text>
    </svg>
  );
}

export function LruDiagram() {
  return (
    <svg className="qa-diagram-svg" viewBox="0 0 440 210" role="img" aria-label="LRU recency ordering">
      <title>LRU recency</title>
      <text x="220" y="22" textAnchor="middle" fill={muted} fontSize="12" fontWeight="700" fontFamily="Sora, sans-serif">
        Most recent use (right) · LRU victim (left)
      </text>
      <g transform="translate(40, 52)">
        <rect x={0} y={0} width={100} height={56} rx={8} fill="rgba(129, 140, 248, 0.15)" stroke="rgba(165, 180, 252, 0.6)" strokeWidth={1.5} />
        <text x={50} y={36} textAnchor="middle" fill="#a5b4fc" fontSize="18" fontWeight="800" fontFamily="Space Grotesk, sans-serif">
          LRU
        </text>
      </g>
      <text x="90" y="130" textAnchor="middle" fill={muted} fontSize="10" fontWeight="700" fontFamily="Sora, sans-serif">
        replace first
      </text>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${165 + i * 85}, 52)`}>
          <rect x={0} y={0} width={72} height={56} rx={8} fill={fillPanel} stroke={stroke} strokeWidth={1.5} />
          <text x={36} y={38} textAnchor="middle" fill={accent} fontSize="20" fontWeight="800" fontFamily="Space Grotesk, sans-serif">
            {["P", "Q", "R"][i]}
          </text>
        </g>
      ))}
      <path d="M 165 115 L 355 115" stroke={muted} strokeWidth={1.5} markerEnd="url(#arrowLru)" />
      <defs>
        <marker id="arrowLru" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={muted} />
        </marker>
      </defs>
      <text x="260" y="138" textAnchor="middle" fill={hit} fontSize="11" fontWeight="700" fontFamily="Sora, sans-serif">
        increasing recency →
      </text>
    </svg>
  );
}

export function OptimalDiagram() {
  return (
    <svg className="qa-diagram-svg" viewBox="0 0 460 220" role="img" aria-label="Optimal picks farthest next use">
      <title>Optimal future reference</title>
      <text x="230" y="22" textAnchor="middle" fill={muted} fontSize="12" fontWeight="700" fontFamily="Sora, sans-serif">
        Replace the page used farthest in the future (or never again)
      </text>
      <g transform="translate(30, 48)">
        <text x={0} y={14} fill={muted} fontSize="11" fontWeight="700" fontFamily="Sora, sans-serif">
          Reference sequence
        </text>
        {["7", "0", "1", "?", "2", "…"].map((t, i) => (
          <g key={i} transform={`translate(${i * 52}, 14)`}>
            <rect x={0} y={0} width={44} height={36} rx={6} fill={i === 3 ? "rgba(244, 63, 94, 0.15)" : fillPanel} stroke={i === 3 ? "#fb7185" : stroke} strokeWidth={1.2} />
            <text x={22} y={24} textAnchor="middle" fill={i === 3 ? "#fda4af" : accent} fontSize="14" fontWeight="800" fontFamily="Space Grotesk, sans-serif">
              {t}
            </text>
          </g>
        ))}
      </g>
      <g transform="translate(30, 130)">
        <rect x={0} y={0} width={400} height={56} rx={10} fill="rgba(0,0,0,0.2)" stroke={stroke} strokeWidth={1} />
        <text x={12} y={22} fill={muted} fontSize="10" fontWeight="700" fontFamily="Sora, sans-serif">
          In frames: compare next use distance →
        </text>
        <text x={12} y={40} fill={accent} fontSize="11" fontWeight="700" fontFamily="Sora, sans-serif">
          Victim = page with latest / no future reference
        </text>
      </g>
    </svg>
  );
}
