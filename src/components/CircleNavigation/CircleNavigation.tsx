import React, { useState, useEffect, useRef } from "react";

import styles from "./CircleNavigation.module.scss";

interface CircleNavigationProps {
  current: number;
  total: number;
  onChange: (index: number) => void;
}

const CircleNavigation: React.FC<CircleNavigationProps> = ({
  current,
  total,
  onChange,
}) => {
  const buttonCount = total;
  const radius = 265;
  const buttonRadius = 6;
  const activeButtonRadius = 56;
  const center = { x: 265, y: 265 };
  const activeAngle = 60;

  const [activeButton, setActiveButton] = useState(current);
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const circleRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = (index: number) => {
    if (isRotating || index + 1 === activeButton) return;

    const step = 360 / buttonCount;
    const currentAngle = (step * index + rotation + 120) % 360;
    let delta = activeAngle - currentAngle;
    if (delta >= 180) delta -= 360;
    if (delta < -180) delta += 360;

    const newRotation = rotation + delta;

    setIsRotating(true);
    setRotation(newRotation);
    setActiveButton(index + 1);
    onChange(index);
  };

  useEffect(() => {
    if (isRotating) {
      const timer = setTimeout(() => {
        setIsRotating(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isRotating]);

  useEffect(() => {
    handleButtonClick(current - 1);
  }, [current]);

  return (
    <div className={styles.container}>
      <div
        ref={circleRef}
        className={styles.circle}
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {Array.from({ length: buttonCount }).map((_, index) => {
          const step = 360 / buttonCount;
          const angle = step * index;
          const radian = (angle * Math.PI) / 180;
          const x = center.x + radius * Math.cos(radian);
          const y = center.y + radius * Math.sin(radian);

          const isActive = index + 1 === activeButton;
          const isHovered = hoveredButton === index;
          const buttonSize =
            isActive || isHovered ? activeButtonRadius : buttonRadius;

          const counterRotate = -rotation;

          return (
            <div
              key={index}
              className={styles.button}
              style={{
                width: buttonSize,
                height: buttonSize,
                left: x - buttonSize / 2,
                top: y - buttonSize / 2,
                fontSize: isActive || isHovered ? "1rem" : "0",
                backgroundColor:
                  isActive || isHovered
                    ? "var(--back-ground)"
                    : "var(--black-blue)",
                transform: `rotate(${counterRotate}deg)`,
                transformOrigin: "center",
                cursor: isActive ? "default" : "pointer",
                zIndex: isActive ? 10 : 1,
              }}
              onClick={() => handleButtonClick(index)}
              onMouseEnter={() => setHoveredButton(index)}
              onMouseLeave={() => setHoveredButton(null)}
              aria-label={`Button ${index + 1}`}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CircleNavigation;
