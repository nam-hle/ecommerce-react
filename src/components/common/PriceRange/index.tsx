import React, { useState } from "react";
import { Handles, Rail, Slider, Ticks, Tracks } from "react-compound-slider";

import { Handle } from "./Handle";
import { SliderRail } from "./SliderRail";
import { Tick } from "./Tick";
import { Track } from "./Track";

const sliderStyle = {
  position: "relative",
  width: "100%",
};

export const PriceRange: React.FC<PriceRangeProps> = ({ min, max, initMin, initMax, productsCount, onPriceChange }) => {
  const [state, setState] = useState({
    domain: [min, max],
    values: [initMin || min, initMax || max],
    update: [min, max].slice(),
    inputMin: initMin || min,
    inputMax: initMax || max,
    inputError: false,
    reversed: false,
  });

  const onUpdate = (update: ReadonlyArray<number>) => {
    setState(() => ({
      ...state,
      update: [...update],
      inputMin: update[0],
      inputMax: update[1],
    }));
  };

  const onChange = (values: ReadonlyArray<number>) => {
    setState(() => ({
      ...state,
      values: [...values],
      inputMin: values[0],
      inputMax: values[1],
    }));
    if (values[0] < values[1]) {
      onPriceChange(values);
    }
  };

  const inputClassName = () => (state.inputError ? "price-range-input price-input-error" : "price-range-input");

  return (
    <div style={{ height: 120, width: "100%" }}>
      <div className="price-range-control">
        <input
          className={inputClassName()}
          disabled={productsCount === 0}
          max={max}
          min={min}
          type="number"
          readOnly
          value={state.inputMin}
        />
        —
        <input
          className={inputClassName()}
          disabled={productsCount === 0}
          max={max}
          min={min}
          type="number"
          readOnly
          value={state.inputMax}
        />
      </div>
      <Slider
        mode={1}
        step={1}
        domain={state.domain}
        rootStyle={sliderStyle}
        onUpdate={onUpdate}
        onChange={onChange}
        values={state.values}>
        <Rail>{({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}</Rail>
        <Handles>
          {({ handles, activeHandleID, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map((handle) => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={state.domain}
                  isActive={handle.id === activeHandleID}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track key={id} source={source} target={target} getTrackProps={getTrackProps} />
              ))}
            </div>
          )}
        </Tracks>
        <Ticks count={5}>
          {({ ticks }) => (
            <div className="slider-ticks">
              {ticks.map((tick) => (
                <Tick key={tick.id} tick={tick} count={ticks.length} />
              ))}
            </div>
          )}
        </Ticks>
      </Slider>
    </div>
  );
};

PriceRange.defaultProps = {
  initMin: undefined,
  initMax: undefined,
};

type PriceRangeProps = {
  initMin?: number;
  initMax?: number;
  min: number;
  max: number;
  productsCount: number;
  onPriceChange: (values: readonly number[]) => void;
};
