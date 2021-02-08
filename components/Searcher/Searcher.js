import React, { useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import TimelineIcon from "@material-ui/icons/Timeline";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useInput } from "../../hooks";

const styles = {
  table: {
    minWidth: "512px"
  },
  tableRow: {
    cursor: "pointer"
  },
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
const Searcher = ({ placeholder, value, submit = value => {} }) => {
  const [input, handleInput, setInput] = useInput({
    search: ""
  });
  useEffect(() => {
    if (value)
      setInput({
        search: value
      });
  }, [value]);
  return (
    <FormControl style={styles.form}>
      <div style={styles.formLine}>
        <Input
          value={input.search}
          onChange={handleInput}
          name={"search"}
          style={styles.formInput}
          placeholder={placeholder}
          onKeyDown={e => {
            if (e.key === "Enter") submit(input.search);
          }}
          startAdornment={
            <InputAdornment position="start">
              <TimelineIcon />
            </InputAdornment>
          }
        />
        <IconButton
          onClick={e => {
            submit(input.search);
          }}
        >
          <SearchIcon />
        </IconButton>
      </div>
    </FormControl>
  );
};

export default Searcher;
