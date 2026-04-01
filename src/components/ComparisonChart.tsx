import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

interface ComparisonChartProps {
  fifoFaults: number;
  lruFaults: number;
  optimalFaults: number;
}

const colors = ["#38bdf8", "#2dd4bf", "#818cf8"];

export function ComparisonChart({ fifoFaults, lruFaults, optimalFaults }: ComparisonChartProps) {
  const data = [
    { name: "FIFO", faults: fifoFaults },
    { name: "LRU", faults: lruFaults },
    { name: "Optimal", faults: optimalFaults }
  ];

  return (
    <section className="panel">
      <h2>Algorithm Comparison</h2>
      <p className="muted">Page fault count across FIFO, LRU, and Optimal.</p>

      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} margin={{ top: 8, right: 12, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.16)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.82)" />
            <YAxis allowDecimals={false} stroke="rgba(255,255,255,0.82)" />
            <Tooltip cursor={{ fill: "rgba(255,255,255,0.08)" }} />
            <Legend />
            <Bar dataKey="faults" name="Page Faults" radius={[10, 10, 0, 0]}>
              {data.map((entry, idx) => (
                <Cell key={entry.name} fill={colors[idx]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
