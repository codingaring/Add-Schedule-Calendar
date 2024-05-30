export function formatDate(date) {
  if (date < 10) {
    return "0" + date;
  } else {
    return String(date);
  }
}

export default formatDate;
