import React from "react";
import { parseUrlPatternInText } from "../../lib";

const MultiLines = ({ lines, style, className }) => {
  return (
    <div style={style} className={className}>
      {lines
        .split("\n")
        .filter(line => line)
        .map(line => {
          return (
            <p
              className="explain"
              key={line}
              dangerouslySetInnerHTML={{
                __html: parseUrlPatternInText(line)
              }}
            />
          );
        })}
    </div>
  );
};

export default MultiLines;
