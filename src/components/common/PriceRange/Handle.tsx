import React, { useState } from "react";

export const Handle: React.FC<HandleProps> = (props) => {
  const [mouseOver, setMouseOver] = useState(false);

  const {
    domain: [min, max],
    handle: { id, value, percent },
    isActive,
    disabled,
    getHandleProps,
  } = props;

  return (
    <>
      {(mouseOver || isActive) && !disabled ? (
        <div
          style={{
            left: `${percent}%`,
            position: "absolute",
            marginLeft: "-11px",
            marginTop: "-35px",
          }}>
          <div className="tooltip">
            <span className="tooltiptext">
              Value:
              {value}
            </span>
          </div>
        </div>
      ) : null}
      <div
        style={{
          left: `${percent}%`,
          position: "absolute",
          transform: "translate(-50%, -50%)",
          WebkitTapHighlightColor: "rgba(0,0,0,0)",
          zIndex: 400,
          width: 26,
          height: 42,
          cursor: "pointer",
          // border: '1px solid grey',
          backgroundColor: "none",
        }}
        {...getHandleProps(id, {
          onMouseEnter: () => setMouseOver(() => true),
          onMouseLeave: () => setMouseOver(() => false),
        })}
      />
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{
          left: `${percent}%`,
          position: "absolute",
          transform: "translate(-50%, -50%)",
          WebkitTapHighlightColor: "rgba(0,0,0,0)",
          zIndex: 300,
          width: 24,
          height: 24,
          border: 0,
          borderRadius: "50%",
          boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.2)",
          backgroundColor: disabled ? "#666" : "#1a1a1a",
        }}
      />
    </>
  );
};

interface HandleProps {
  domain: number[];
  handle: {
    id: string;
    value: number;
    percent: number;
  };
  getHandleProps: MouseCallbacks;
  isActive: boolean;
  disabled?: boolean;
}

Handle.defaultProps = {
  disabled: false,
};

type MouseCallbacks = (id: string, callbacks: { onMouseEnter: () => void; onMouseLeave: () => void }) => void;
