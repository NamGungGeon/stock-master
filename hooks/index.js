import { useState } from "react";

export const useInput = defaultValue => {
  const [input, setInput] = useState(defaultValue);
  const handleInput = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };
  return [input, handleInput, setInput];
};
