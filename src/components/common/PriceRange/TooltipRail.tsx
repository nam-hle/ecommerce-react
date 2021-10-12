import React, { useState } from "react";

const railStyle: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  transform: "translate(0%, -50%)",
  height: 20,
  cursor: "pointer",
  zIndex: 300,
  // border: '1px solid grey',
};

const railCenterStyle: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  transform: "translate(0%, -50%)",
  height: 14,
  borderRadius: 7,
  cursor: "pointer",
  pointerEvents: "none",
  backgroundColor: "#d0d0d0",
};

export const TooltipRail: React.FC<TooltipRailProps> = (props) => {
  const [value, setValue] = useState(null);
  const [percent, setPercent] = useState<number | null>(0);

  const onMouseEnter = () => {
    document.addEventListener("mousemove", onMouseMove);
  };

  const onMouseLeave = () => {
    setValue(null);
    setPercent(null);
    document.removeEventListener("mousemove", onMouseMove);
  };

  const onMouseMove = (e: MouseEvent) => {
    const { activeHandleID, getEventData } = props;

    if (activeHandleID) {
      setValue(null);
      setPercent(null);
    } else {
      const eventData = getEventData?.(e);
      if (eventData) {
        setValue(eventData.value);
        setPercent(eventData.percent);
      }
    }
  };

  const { activeHandleID, getRailProps } = props;

  return (
    <>
      {!activeHandleID && value ? (
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
        style={railStyle}
        {...getRailProps({
          onMouseEnter,
          onMouseLeave,
        })}
      />
      <div style={railCenterStyle} />
    </>
  );
};

TooltipRail.defaultProps = {
  getEventData: undefined,
  activeHandleID: undefined,
  disabled: false,
};

type TooltipRailProps = {
  getEventData?: (e: MouseEvent) => { value: any; percent: number | null };
  activeHandleID?: string;
  getRailProps: (params: { onMouseEnter: () => void; onMouseLeave: () => void }) => React.ReactNode;
  disabled?: boolean;
};
