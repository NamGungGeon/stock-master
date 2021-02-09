import React, { useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import TimelineIcon from "@material-ui/icons/Timeline";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useInput } from "../../hooks";

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
const TextSearcher = ({ placeholder, submit, search, handleSearch }) => {
  return (
    <FormControl style={styles.form}>
      <div style={styles.formLine}>
        <Input
          value={search}
          onChange={handleSearch}
          name={"search"}
          style={styles.formInput}
          placeholder={placeholder}
          onKeyDown={e => {
            if (e.key === "Enter" && submit) submit(search);
          }}
          startAdornment={
            <InputAdornment position="start">
              <TimelineIcon />
            </InputAdornment>
          }
        />
        {submit && (
          <IconButton
            onClick={e => {
              if (submit) submit(search);
            }}
          >
            <SearchIcon />
          </IconButton>
        )}
      </div>
    </FormControl>
  );
};

export default TextSearcher;
