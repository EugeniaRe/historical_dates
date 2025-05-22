import React, { useState, useRef } from "react";
import CircleNavigation from "../CircleNavigation/CircleNavigation";
import EventsSlider from "../EventsSlider/EventsSlider";
import { TimeSegmentData } from "../../types/types";
import SegmentSwitcher from "../SegmentSwitcher/SegmentSwitcher";

import styles from "./HistoricalDatesBlock.module.scss";

interface HistoricalDatesBlockProps {
  data: TimeSegmentData[];
}

const HistoricalDatesBlock: React.FC<HistoricalDatesBlockProps> = ({
  data,
}) => {
  const [activeIndex, setActiveIndex] = useState(5);
  const blockRef = useRef<HTMLDivElement>(null);
  const [currentStartYear, setCurrentStartYear] = useState(
    data[activeIndex].startYear
  );
  const [currentEndYear, setCurrentEndYear] = useState(
    data[activeIndex].endYear
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const currentSegment = data[activeIndex];

  if (!currentSegment) {
    return (
      <div className={styles.historicalDatesBlock}>
        Нет данных для отображения.
      </div>
    );
  }

  const handleSegmentChange = (index: number) => {
    console.log(data[index].startYear, data[index].endYear);
    handleChangeYear(data[index].startYear, data[index].endYear);
    setActiveIndex(index);
  };

  const startYearRef = useRef<HTMLDivElement>(null);
  const endYearRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleChangeYear = (newStart: number, newEnd: number) => {
    if (isAnimating) return;

    setIsAnimating(true);

    let start = currentStartYear;
    let end = currentEndYear;

    const stepStart = newStart > start ? 1 : -1;
    const stepEnd = newEnd < end ? -1 : 1;

    intervalRef.current = setInterval(() => {
      if (start !== newStart) {
        start += stepStart;
        setCurrentStartYear(start);
      }

      if (end !== newEnd) {
        end += stepEnd;
        setCurrentEndYear(end);
      }

      if (start === newStart && end === newEnd) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsAnimating(false);
      }
    }, 60);
  };

  return (
    <main className={styles.main} ref={blockRef}>
      <div className={styles.header}>
        <div className={styles.vertical_line}></div>
        <h1 className={styles.title}>Исторические даты</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.years_container}>
          <div ref={startYearRef} className={styles.start_year}>
            {currentStartYear}
          </div>
          <div ref={endYearRef} className={styles.end_year}>
            {currentEndYear}
          </div>
        </div>
        <CircleNavigation
          current={activeIndex + 1}
          total={data.length}
          onChange={handleSegmentChange}
        />
        <SegmentSwitcher
          current={activeIndex + 1}
          total={data.length}
          onChange={handleSegmentChange}
        />
      </div>

      <EventsSlider events={currentSegment.events} />
    </main>
  );
};

export default HistoricalDatesBlock;
