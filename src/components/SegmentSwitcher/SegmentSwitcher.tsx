import React, { useEffect, useState } from "react";

import styles from "./SegmentSwitcher.module.scss";

interface SegmentSwitcher {
  current: number;
  total: number;
  onChange: (index: number) => void;
}

const SegmentSwitcher: React.FC<SegmentSwitcher> = ({
  current,
  total,
  onChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(current);

  useEffect(() => setCurrentIndex(current), [current]);
  const transformNum = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  const handleButtonClick = (index: number) => {
    if (index < 1 || index > total) return;

    setCurrentIndex(index);

    onChange(index - 1);
  };

  return (
    <div className={styles.switcher}>
      <div className={styles.count}>{`${transformNum(
        currentIndex
      )}/${transformNum(total)}`}</div>
      <div className={styles.buttons_wrapper}>
        <button
          className={`${styles.button}`}
          onClick={() => handleButtonClick(currentIndex - 1)}
          disabled={currentIndex === 1}
        >
          <span className={styles.arrow_left} />
        </button>
        <button
          className={styles.button}
          onClick={() => handleButtonClick(currentIndex + 1)}
          disabled={currentIndex === total}
        >
          <span className={styles.arrow_right} />
        </button>
      </div>
    </div>
  );
};

export default SegmentSwitcher;
