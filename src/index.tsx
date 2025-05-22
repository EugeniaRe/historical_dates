import React from "react";
import { createRoot } from "react-dom/client";
import HistoricalDatesBlock from "./components/HistoricalDatesBlock/HistoricalDatesBlock";
import { historicalData } from "./data/data";

import "./main.scss";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <HistoricalDatesBlock data={historicalData} />
    </React.StrictMode>
  );
}
