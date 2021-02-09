import { parseHTML } from "./markup";

export const isError = (e, cause) => {
  const result = e instanceof Error;

  if (result)
    if (e.response) {
      console.error(cause, e.response.status);
    } else console.error(cause, e);
  else console.log(cause, e);

  return result;
};

export const parseUrlPatternInText = text => {
  const urlRegex = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  return text.replace(urlRegex, function(url) {
    return '<a href="' + url + '">' + url + "</a>";
  });
};
