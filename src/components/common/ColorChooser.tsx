import React, { useState } from "react";

export const ColorChooser: React.FC<ColorChooserProps> = ({ availableColors, onSelectedColorChange }) => {
  const [selectedColor, setSelectedColor] = useState("");

  const setColor = (color: string) => {
    setSelectedColor(color);
    onSelectedColorChange(color);
  };
  return (
    <div className="color-chooser">
      {availableColors.map((color) => (
        <div
          className={selectedColor === color ? "color-item color-item-selected" : "color-item"}
          key={color}
          onClick={() => setColor(color)}
          style={{ backgroundColor: color }}
          role="presentation"
        />
      ))}
    </div>
  );
};

type ColorChooserProps = {
  availableColors: string[];
  onSelectedColorChange: (params: string) => void;
};
