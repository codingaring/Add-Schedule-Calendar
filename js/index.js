const date = new Date();

const currentYear = date.getFullYear();
const currentMonth = date.getMonth();
const day = date.getDate();

document.querySelector(".today").textContent = `${currentYear}년 ${
  currentMonth + 1
}월`;

const prevLastDate = new Date(currentYear, currentMonth, 0);
const currentLastDate = new Date(currentYear, currentMonth + 1, 0);

const prevLast = prevLastDate.getDate();
const prevLastDay = prevLastDate.getDay();

const currentLast = currentLastDate.getDate();
const currentLastDay = currentLastDate.getDay();

const prevDates = [];
const thisDates = [...Array(currentLast + 1).keys()].slice(1);
const nextDates = [];

if (prevLastDay !== 6) {
  for (let i = 0; i < prevLastDay + 1; i++) {
    prevDates.unshift(prevLast - i);
  }
}

for (let i = 1; i < 7 - currentLastDay; i++) {
  nextDates.push(i);
}

const dates = prevDates.concat(thisDates, nextDates);

dates.forEach((date, i) => {
  if (i < prevDates.length) {
    dates[i] = `<div class="date prev">${date}</div>`;
  } else if (i > prevDates.length + thisDates.length - 1) {
    dates[i] = `<div class="date prev">${date}</div>`;
  } else if (prevDates.length < i < dates.length - nextDates.length) {
    dates[i] = `<div class="date">${date}</div>`;
  }
});

document.querySelector(".dates").innerHTML = dates.join("");

/** add to do*/
const todoForm = document.querySelector(".todo-input-container");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list-container");
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
    document.querySelector(".todo-list-container").innerHTML =
      todoListArray.join("");
    todoInput.value = "";
  }

  const checkButtons = document.querySelectorAll("#check-button");
  const checkTodoTexts = document.querySelectorAll("#process-text");

  checkButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      checkButtons[index].classList.toggle("done");
      checkTodoTexts[index].classList.toggle("complete");
    });
  });
}

todoForm.addEventListener("submit", printValue);
