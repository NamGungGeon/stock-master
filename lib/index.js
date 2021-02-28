import { parseHTML } from "./markup";

export const isError = (e, cause) => {
  const result = e instanceof Error;

  if (result) {
    if (e.response) {
      console.error(cause, e.response.data);
    } else console.error(cause, e);
  } else console.log(cause);

  return result;
};

export const parseUrlPatternInText = text => {
  const urlRegex = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  return text.replace(urlRegex, function(url) {
    return '<a href="' + url + '">' + url + "</a>";
  });
};
export const randStr = length => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const endIdx = length ? length : 10;
  for (let i = 0; i < endIdx; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};
