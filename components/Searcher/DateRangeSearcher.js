import React, { useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import { IconButton, TextField } from "@material-ui/core";
import { beautifyDate, getCurrentDateString } from "../../lib/moment";

const styles = {
  form: {
    width: "100%",
    textAlign: "center",
    alignItems: "flex-end"
  },
  formLine: {
    maxWidth: "350px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  formInput: {
    flex: "1"
  }
};

const DateRangeSearcher = ({ range, handleRange }) => {
  const dateFormat = "YYYY-MM-DD";
  return (
    <FormControl style={styles.form}>
      <div style={styles.formLine}>
        <TextField
          name="startDate"
          label="시작 날짜"
          type="date"
          value={range.startDate ?? getCurrentDateString(dateFormat)}
          style={styles.formInput}
          InputLabelProps={{
            shrink: true
          }}
          onChange={handleRange}
        />
        <TextField
          name="endDate"
          label="종료 날짜"
          type="date"
          defaultValue="2020-03-31"
          value={range.endDate ?? getCurrentDateString(dateFormat)}
          style={styles.formInput}
          InputLabelProps={{
            shrink: true
          }}
          onChange={handleRange}
        />
      </div>
    </FormControl>
  );
};

export default DateRangeSearcher;
