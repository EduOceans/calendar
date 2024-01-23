// CALENDAR

// READ day.js DOCUMENTATION and apply it in the code

// Structure of the web
//* Display the current day at the top of the calender when a user opens the planner.

// Create blocks with times of the day where an user can write events
// - Select <p id="currentDay" class="lead"></p> and apply day.js code 
// so that it is up to date with calendar
function getDayName(date) {
    return date.toLocaleDateString(undefined, { weekday: 'long' });    
}

function getMonthName(date) {
    return date.toLocaleDateString(undefined, { month: 'long' });    
}
function getTime(date) {
    return new Date(new Date().setHours(10)).toLocaleString(undefined, { hour: 'numeric'});
}
function nthNumber(number) {
    if (number > 3 && number < 21) return "th";
    switch (number % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
}

var d = new Date();
var strDate = d.getDate();
var formattedDate = `${getDayName(d)}, ${getMonthName(d)} ${strDate}${nthNumber(strDate)}`;
$("#currentDay").append(formattedDate);

// - Select <div class="container"> and create the blocks in the div
var blockEl = $(".container");
const workingHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

for (let i = 0; i < workingHours.length; i++) {
  let currentTime = getTime(d);
  let inputEl;

  if (currentTime == workingHours[i]) {
    inputEl = $(`<input type="text" class="col col-10 description${[i]} present"/>`);
  }
  else if (currentTime < workingHours[i]) {
    inputEl = $(`<input type="text" class="col col-10 description${[i]} future"/>`);
  }
  else if (currentTime > workingHours[i]) {
    inputEl = $(`<input type="text" class="col col-10 description${[i]} past"/>`);
  }
  const rowEl = $(`<div class="row">`);
  const hourEl = $(`<div class="col col-1 hour">${workingHours[i]}</div>`);
  const btnEl = $(`<button id="${i}" class="col col-1 saveBtn">SAVE</button>`);
  
  blockEl.append(rowEl);
  rowEl.append(hourEl);
  rowEl.append(inputEl);
  rowEl.append(btnEl);
  
} 

$(".saveBtn").on("click", function() {

  const input = $(`.description${this.id}`).val();
  console.log(input);
  localStorage.setItem("event", JSON.stringify(input));
});

// Save event in local storage when save button is clicked in that timeblock.
// It must stay saved when refresh