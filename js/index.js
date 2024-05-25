const date = new Date();

let selectYear = date.getFullYear();
let selectMonth = date.getMonth();
let day = date.getDate();

document.querySelector(".today").textContent = `${selectYear}년 ${
  selectMonth + 1
}월`;

let prevLastDate = new Date(selectYear, selectMonth, 0);
let currentLastDate = new Date(selectYear, selectMonth + 1, 0);

let prevLast = prevLastDate.getDate();
let prevLastDay = prevLastDate.getDay();

let currentLast = currentLastDate.getDate();
let currentLastDay = currentLastDate.getDay();

let prevDates = [];
let thisDates = [...Array(currentLast + 1).keys()].slice(1);
let nextDates = [];

if (prevLastDay !== 6) {
  for (let i = 0; i < prevLastDay + 1; i++) {
    prevDates.unshift(prevLast - i);
  }
}

for (let i = 1; i < 7 - currentLastDay; i++) {
  nextDates.push(i);
}

let dates = prevDates.concat(thisDates, nextDates);

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
  const prevButton = document.querySelector(".nav-button.go-prev");
  const nextButton = document.querySelector(".nav-button.go-next");

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

    const prevLastDate = new Date(selectYear, selectMonth, 0);
    const currentLastDate = new Date(selectYear, selectMonth + 1, 0);

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

    dates = prevDates.concat(thisDates, nextDates);

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
    document.querySelector(".today").textContent = `${selectYear}년 ${
      selectMonth + 1
    }월`;
  }

  if (prevButton) {
    prevButton.addEventListener("click", handleSelectMonth);
  }

  if (nextButton) {
    nextButton.addEventListener("click", handleSelectMonth);
  }
});
