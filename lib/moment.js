import moment from "moment";

const originFormat = "YYYY-MM-DD[T]HH:mm:ss";
const beautifulFormat = "YYYY-MM-DD[ ]HH[시] mm[분]";

export const beautifyDate = (
  dateString,
  format = {
    originFormat,
    beautifulFormat
  }
) => {
  return moment(dateString, format.originFormat ?? originFormat).format(
    format.beautifulFormat ?? beautifulFormat
  );
};
