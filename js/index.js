import updateDates from "./updateDates.js";
import formatDate from "./utils/formatDate.js";
import { selector, selectorAll } from "./utils/querySelector.js";

const date = new Date();

let selectYear = date.getFullYear();
let selectMonth = date.getMonth();
let day = date.getDate();

selector(".today").textContent = `${selectYear}년 ${selectMonth + 1}월`;

updateDates(selectYear, selectMonth);

/** add to do*/
const todoForm = selector(".todo-input-container");
const todoInput = selector(".todo-input");
const todoList = selector(".todo-list-container");
const todoListArray = [];

function printValue(event) {
  event.preventDefault();
  const toDo = todoInput.value;

  if (toDo) {
    const toDoTag = `
    <li class="todo-todo">
      <button id="check-button" class="process" type="button"></button>
      <span id="process-text">${toDo}</span>
      <button type="button" class="todo-delete-button"></button>
    </li>`;
    todoListArray.push(toDoTag);
    selector(".todo-list-container").innerHTML = todoListArray.join("");
    todoInput.value = "";
  }

  const checkButtons = selectorAll("#check-button");
  const checkTodoTexts = selectorAll("#process-text");

  function checkTodo(index) {
    checkButtons[index].classList.toggle("done");
    checkTodoTexts[index].classList.toggle("complete");
  }

  checkButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      checkTodo(index);
    });
  });
}

todoForm.addEventListener("submit", printValue);

// change selectMonth
document.addEventListener("DOMContentLoaded", function () {
  const prevButton = selector(".nav-button.go-prev");
  const nextButton = selector(".nav-button.go-next");

  function handleSelectMonth(event) {
    if (event.target.classList.contains("go-prev")) {
      if (selectMonth === 0) {
        selectYear--;
        selectMonth = 11;
      } else {
        selectMonth--;
      }
    } else if (event.target.classList.contains("go-next")) {
      if (selectMonth === 11) {
        selectYear++;
        selectMonth = 0;
      } else {
        selectMonth++;
      }
    }

    updateDates(selectYear, selectMonth);
    selector(".today").textContent = `${selectYear}년 ${selectMonth + 1}월`;

    handleAddEventListener();
  }

  if (prevButton) {
    prevButton.addEventListener("click", handleSelectMonth);
  }

  if (nextButton) {
    nextButton.addEventListener("click", handleSelectMonth);
  }

  /** date event */
  function handleAddEventListener() {
    const dateList = selectorAll(".date");

    function handleSelectDate(year, month, date) {
      let selectCurrentMonth = formatDate(month + 1);
      let selectCurrentDate = formatDate(Number(date));

      let selectCurrentFullDate = year + selectCurrentMonth + selectCurrentDate;

      return {
        selectCurrentFullDate,
        selectCurrentDate,
        selectCurrentMonth,
        year,
      };
    }

    dateList.forEach((date) =>
      date.addEventListener("click", (event) => {
        const selectDate = selector(".todo-today");

        let { selectCurrentDate, selectCurrentMonth, year } = handleSelectDate(
          selectYear,
          selectMonth,
          event.target.textContent
        );

        selectDate.innerHTML = `${year}년 ${selectCurrentMonth}월 ${selectCurrentDate}일`;
      })
    );
  }
  handleAddEventListener();
});
