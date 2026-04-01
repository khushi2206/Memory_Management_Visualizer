import { FifoDiagram, LruDiagram, OptimalDiagram } from "../components/AlgorithmDiagrams";

const terms: { term: string; definition: string }[] = [
  {
    term: "Page",
    definition: "A fixed-size block of logical address space. The CPU requests pages by number; the OS maps them into physical frames."
  },
  {
    term: "Frame (page frame)",
    definition: "A slot in physical memory that holds exactly one page. Your simulator’s “number of frames” is how many pages can be resident at once."
  },
  {
    term: "Reference string",
    definition: "The ordered list of page numbers the CPU accesses. Each entry is one memory reference (e.g. 7,0,1,2,…)."
  },
  {
    term: "Page hit",
    definition: "The requested page is already in a frame—no disk access, no replacement."
  },
  {
    term: "Page fault",
    definition: "The requested page is not in any frame. The OS must load it (here: evict another page if memory is full)."
  },
  {
    term: "Victim page",
    definition: "The page chosen to be removed from a frame to make room. Each replacement policy uses different rules to pick the victim."
  },
  {
    term: "Replacement policy",
    definition: "The algorithm that decides which resident page to evict on a fault when all frames are full."
  }
];

export function QAsPage() {
  return (
    <>
      <header className="hero hero--compact">
        <h1>Q&amp;As · Algorithms &amp; terms</h1>
        <p className="hero-history-sub">
          Short explanations of FIFO, LRU, and Optimal paging, simple diagrams, and core vocabulary used in this visualizer.
        </p>
      </header>

      <main className="qa-page-main">
        <section className="panel qa-section">
          <h2>Terminology</h2>
          <p className="muted qa-lead">Key concepts for reading the simulator and OS textbooks.</p>
          <dl className="qa-term-list">
            {terms.map(({ term, definition }) => (
              <div key={term} className="qa-term-row">
                <dt>{term}</dt>
                <dd>{definition}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="panel qa-section">
          <h2>FIFO — First-In, First-Out</h2>
          <p className="qa-body">
            <strong>FIFO</strong> maintains a fixed circular order over frames. On a fault with full memory, it evicts the page that has been in its frame the{" "}
            <strong>longest</strong>—the “oldest” resident—then loads the new page. It does not look at how often or how recently a page was used.
          </p>
          <ul className="qa-bullets">
            <li>
              <strong>Pros:</strong> Simple to implement (queue / round-robin pointer).
            </li>
            <li>
              <strong>Cons:</strong> Can perform poorly on real workloads; <strong>Belady’s anomaly</strong>—more frames can sometimes increase faults for FIFO.
            </li>
          </ul>
          <figure className="qa-figure">
            <div className="qa-diagram-wrap">
              <FifoDiagram />
            </div>
            <figcaption className="qa-caption">Frames are served in rotation; the next eviction follows the ring order.</figcaption>
          </figure>
        </section>

        <section className="panel qa-section">
          <h2>LRU — Least Recently Used</h2>
          <p className="qa-body">
            <strong>LRU</strong> evicts the page that has not been referenced for the <strong>longest time</strong>. It assumes recent past predicts near future: pages used
            lately are likely needed again soon.
          </p>
          <ul className="qa-bullets">
            <li>
              <strong>Pros:</strong> Often much better than FIFO in practice; no Belady stack anomaly with this idealized LRU model.
            </li>
            <li>
              <strong>Cons:</strong> Exact LRU needs tracking each access (hardware counters, stacks, or approximations like clock / NFU in real OSes).
            </li>
          </ul>
          <figure className="qa-figure">
            <div className="qa-diagram-wrap">
              <LruDiagram />
            </div>
            <figcaption className="qa-caption">Conceptually, the least recently used end of the ordering is replaced next.</figcaption>
          </figure>
        </section>

        <section className="panel qa-section">
          <h2>Optimal (OPT / MIN)</h2>
          <p className="qa-body">
            <strong>Optimal</strong> replaces the page whose <strong>next use is farthest in the future</strong> in the entire reference string. If a page will never be used
            again, it is an ideal victim. This policy gives the <strong>minimum possible</strong> fault count for a given string and frame count.
          </p>
          <ul className="qa-bullets">
            <li>
              <strong>Pros:</strong> The benchmark to compare real policies; proves what is theoretically best offline.
            </li>
            <li>
              <strong>Cons:</strong> Not implementable in real time—the OS does not know the future reference string.
            </li>
          </ul>
          <figure className="qa-figure">
            <div className="qa-diagram-wrap">
              <OptimalDiagram />
            </div>
            <figcaption className="qa-caption">Look ahead in the sequence: evict the page used latest next—or not at all.</figcaption>
          </figure>
        </section>
      </main>
    </>
  );
}
