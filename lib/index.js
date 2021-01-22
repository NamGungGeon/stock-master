import { parseHTML } from "./markup";

export const isError = (e, cause) => {
  const result = e instanceof Error;

  if (result)
    if (e.response) {
      console.error(cause, e.response.status);
    } else console.error(cause, e);
  else console.log(cause, e);
  return e instanceof Error;
};
