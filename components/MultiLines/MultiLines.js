import React, { useEffect, useState } from "react";
import { parseUrlPatternInText, randStr } from "../../lib";

const MultiLines = ({ lines, style, className }) => {
  const [_lines, setLines] = useState();
  const [id, setId] = useState();

  useEffect(() => {
    setLines(lines.split("\n").filter(line => line));
    setId(randStr(10));
  }, [lines]);

  if (!id || !_lines) return <div />;
  return (
    <div style={style} className={className}>
      {lines
        .split("\n")
        .filter(line => line)
        .map((line, idx) => {
          return (
            <p
              className="explain"
              key={`${id}-${idx}`}
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
