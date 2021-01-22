export const parseHTML = (html) => {
  const removedTag = html
    .replace(/<.*?>/gi, "")
    .replace(/<.*?>/gi, "")
    .replace(/&.*?;/gi, "")
    .replace(/\r\n/gi, "\n");
  //   console.log("origin", html);
  //   console.log("parsed", removedTag);
  return removedTag;
};
