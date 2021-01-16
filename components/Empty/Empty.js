import React from "react";

const preset = {
  xlarge: 64,
  large: 32,
  normal: 16,
  small: 8,
  xsmall: 4
};
const Empty = ({ size = "normal" }) => {
  return (
    <div
      style={{
        height: `${preset[size] ?? size ?? 0}px`,
        width: `${preset[size] ?? size ?? 0}px`
      }}
    />
  );
};

export default Empty;
