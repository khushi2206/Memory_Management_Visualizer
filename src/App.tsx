import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { SimulationProvider } from "./context/SimulationContext";
import { ComparisonPage } from "./pages/ComparisonPage";
import { HistoryPage } from "./pages/HistoryPage";
import { HomePage } from "./pages/HomePage";
import { QAsPage } from "./pages/QAsPage";

export default function App() {
  return (
    <BrowserRouter>
      <SimulationProvider>
        <div className="app-shell">
          <div className="background-orb orb-1" />
          <div className="background-orb orb-2" />

          <div className="app-top-bar">
            <Navbar />
          </div>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/qas" element={<QAsPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </div>
      </SimulationProvider>
    </BrowserRouter>
  );
}
