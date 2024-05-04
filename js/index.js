const date = new Date();

const currentYear = date.getFullYear();
const currentMonth = date.getMonth();
const day = date.getDate();

document.querySelector(".year-month").textContent = `${currentYear}년 ${
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
/** thisDates -> for (let i = 1; i <= currentLast; i++) {
  prevDates.push(i);
} */

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
  } else if (i > prevDates.length + thisDates.length) {
    dates[i] = `<div class="date prev">${date}</div>`;
  } else if (prevDates.length < i < dates.length - nextDates.length) {
    dates[i] = `<div class="date">${date}</div>`;
  }
});

document.querySelector(".dates").innerHTML = dates.join("");
