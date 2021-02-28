import { useEffect, useState } from "react";
import auth from "../observables/auth";
import ApiRequest from "../http";

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

export const useRequest = () => {
  const [currentAuth, setCurrentAuth] = useState(auth);
  useEffect(() => {
    setCurrentAuth(currentAuth);
  }, [auth]);

  return new ApiRequest(currentAuth);
};
