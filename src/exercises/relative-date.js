/*
 * Write a function that will take a date and compare with today date and return text:
 * - Today: same year, same month, same date
 * - Yesterday: date = today - 1
 * - This week: today - 7 < date < today - 1
 * - Last week: today - 14 < date <= today - 7
 * - This month: same year, same month, date <= today - 14
 * - Last month: month = current month - 1
 * - This year: same year
 * - last year: year = current year - 1
 * - Long time ago: everything else
 *
 * Lastly, please write a unit test for calculateRelativeDate function
 * */

const calculateRelativeDate = (inputDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // clears the time to compare just the dates.

  const input = new Date(inputDate);
  input.setHours(0, 0, 0, 0);

  const msPerDay = 86400000;
  const diffDays = Math.floor((today - input) / msPerDay); // Calculates the difference in days between today and the input date.
  const diffWeeks = Math.floor(diffDays / 7);
  const sameMonth =
    today.getMonth() === input.getMonth() &&
    today.getFullYear() === input.getFullYear();
  const sameYear = today.getFullYear() === input.getFullYear();

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays > 1 && diffDays < 7) {
    return "This week";
  } else if (diffWeeks === 1) {
    return "Last week";
  } else if (sameMonth && diffDays >= 14) {
    return "This month";
  } else if (sameYear && today.getMonth() - input.getMonth() === 1) {
    return "Last month";
  } else if (sameYear) {
    return "This year";
  } else if (today.getFullYear() - input.getFullYear() === 1) {
    return "Last year";
  } else {
    return "Long time ago";
  }
};

const View = {
  init: () => {
    document
      .getElementById("relative-date-btn")
      .addEventListener("click", () => {
        const msgElement = document.getElementById("relative-date-msg");
        const inputDateElem = document.getElementById("relative-date-input");
        msgElement.textContent = calculateRelativeDate(inputDateElem.value);
      });
  },
};

document.addEventListener("DOMContentLoaded", View.init);
export { calculateRelativeDate };
