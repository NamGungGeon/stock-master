import React from "react";

const MultiLines = ({ lines, style, className }) => {
  return (
    <div style={style} className={className}>
      {lines
        .split("\n")
        .filter(line => line)
        .map(line => {
          return (
            <p className="explain" key={line}>
              {line}
            </p>
          );
        })}
    </div>
  );
};

export default MultiLines;
