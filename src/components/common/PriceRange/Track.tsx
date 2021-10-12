import React from "react";

export const Track: React.FC<TrackProps> = ({ source, target, getTrackProps, disabled }) => (
  <div
    style={{
      position: "absolute",
      transform: "translate(0%, -50%)",
      height: 14,
      zIndex: 1,
      backgroundColor: disabled ? "#ffd993" : "#ffa500",
      borderRadius: 7,
      cursor: "pointer",
      left: `${source.percent}%`,
      width: `${target.percent - source.percent}%`,
    }}
    {...getTrackProps()}
  />
);

type TrackProps = {
  source: {
    id: string;
    value: number;
    percent: number;
  };
  target: {
    id: string;
    value: number;
    percent: number;
  };
  getTrackProps: () => void;
  disabled?: boolean;
};

Track.defaultProps = {
  disabled: false,
};
