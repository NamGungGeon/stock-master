export const parseHTML = html => {
  if (!html) return "";

  const removedTag = html
    .replace(/<.*?>/gi, "")
    .replace(/<.*?>/gi, "")
    .replace(/&.*?;/gi, "")
    .replace(/\r\n/gi, "\n");
  //   console.log("origin", html);
  //   console.log("parsed", removedTag);
  return removedTag;
};
