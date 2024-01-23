function getDayName(date) {
    return date.toLocaleDateString(undefined, { weekday: 'long' });    
}

function getMonthName(date) {
    return date.toLocaleDateString(undefined, { month: 'long' });    
}

function getTime(date) {
    return date.toLocaleString(undefined, { hour: 'numeric' } );
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

function get12TimeFormat(time) {
  if (time < 12) {
    return `${time}AM`;
  }
  switch(time) {
    case 12:
      return "12PM";
    case 13:
      return "1PM";
    case 14:
      return "2PM";
    case 15:
      return "3PM";
    case 16:
      return "4PM";
    case 17:
      return "5PM";
  }
}

var d = new Date();
var strDate = d.getDate();
var formattedDate = `${getDayName(d)}, ${getMonthName(d)} ${strDate}${nthNumber(strDate)}`;
$("#currentDay").append(formattedDate);

var blockEl = $(".container");
const workingHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];


for (let i = 0; i < workingHours.length; i++) {

  let currentTime = getTime(d);
  let inputEl;
  const rowEl = $(`<div class="row">`);
  const hourEl = $(`<div class="col col-1 hour">${get12TimeFormat(workingHours[i])}</div>`);
  let btnEl = $(`<button id="${i}" class="col col-1 saveBtn">SAVE</button>`);
  let storedEvent = localStorage.getItem(`event${i}`) || "";

  if (currentTime == workingHours[i]) {
    inputEl = $(`<input type="text" class="col col-10 description${[i]} present" value=${storedEvent}>`);
  }
  else if (currentTime < workingHours[i]) {
    inputEl = $(`<input type="text" class="col col-10 description${[i]} future" value=${storedEvent}>`);
  }
  else if (currentTime > workingHours[i]) {
    inputEl = $(`<input type="text" disabled class="col col-10 description${[i]} past" value=${storedEvent}>`);
    btnEl = $(`<button id="${i}" disabled class="col col-1 saveBtn">SAVE</button>`)
  }
  
  blockEl.append(rowEl);
  rowEl.append(hourEl);
  rowEl.append(inputEl);
  rowEl.append(btnEl);
} 

$(".saveBtn").on("click", function() {
  const input = $(`.description${this.id}`).val();
  localStorage.setItem(`event${this.id}`, input);
});