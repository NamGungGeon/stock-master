import React, { useState } from "react";
import { TableRow } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";

const ExpandableTableRow = ({ onClick, moreRow, colSize = 1, children }) => {
  const [expand, setExpand] = useState(false);
  return (
    <>
      <TableRow
        onClick={onClick}
        style={{
          cursor: "pointer"
        }}
        onClick={e => setExpand(!expand)}
      >
        {children}
      </TableRow>
      {expand && (
        <TableRow>
          <TableCell colSpan={colSize}>{moreRow}</TableCell>
        </TableRow>
      )}
    </>
  );
};

export default ExpandableTableRow;
