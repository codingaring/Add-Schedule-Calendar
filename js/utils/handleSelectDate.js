import { selector, selectorAll } from "./querySelector.js";
import formatDate from "./formatDate.js";

function handleSelectDate(year, month) {
  const dateList = selectorAll(".date");

  dateList.forEach((date) =>
    date.addEventListener("click", (event) => {
      const selectDate = selector(".todo-today");
      let selectCurrentMonth = formatDate(month + 1);
      let selectCurrentDate = formatDate(Number(event.target.textContent));

      selectDate.innerHTML = `${year}년 ${selectCurrentMonth}월 ${selectCurrentDate}일`;
    })
  );
}

export default handleSelectDate;
