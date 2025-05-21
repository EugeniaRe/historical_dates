import React from "react";
import { createRoot } from "react-dom/client";
import HistoricalDatesBlock from "./components/HistoricalDatesBlock/HistoricalDatesBlock";
import { historicalData } from "./data/data";

import "./main.scss"; // Глобальные стили

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      {/* Первый блок */}
      <HistoricalDatesBlock data={historicalData} />
      {/* Для демонстрации независимости, можно добавить еще один блок с другими данными */}
      {/* <HistoricalDatesBlock data={historicalData.slice(0, 3)} /> */}
    </React.StrictMode>
  );
}
