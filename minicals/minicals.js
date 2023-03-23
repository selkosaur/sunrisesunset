let dateglob = new Date();
let yearglob = dateglob.getFullYear();
let monthglob = dateglob.getMonth();
let monthglobfix = monthglob + 1;
let nextmonthglobfix = monthglobfix + 1;
let nextmonthyearglob;
if (monthglobfix == 12) {
  nextmonthglobfix = 1;
  nextmonthyearglob = yearglob + 1;
} else {
  nextmonthyearglob = yearglob;
}

function calcFutureMonths(numberofmonths) {
  let future = {};
  future.month = monthglobfix + parseInt(numberofmonths);
  future.year = yearglob;

  if (future.month > 12) {
    // this won't be accurate looking more than 12 months in the future.. I think?
    future.month = future.month - 12;
    future.year = yearglob + 1;
  }
  return future;
}

function renderMiniCal() { // not using
  /*
  automatically generate this month's calendar ? i can't remember, not using this currently 
  */
  let date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let monthIndex = date.getMonth();
  let curMonth = months[monthIndex];
  let curWeekDay = weekdays[date.getDay()];
  let curDate = date.getDate();
  let curYear = date.getFullYear();
  let monthStartWeekDay = new Date(curYear, date.getMonth(), 1).getDay();
  monthStartWeekDay = weekdays[monthStartWeekDay];
  console.log(curMonth);
  console.log(curWeekDay);
  console.log(monthStartWeekDay);
  createCalendar(calendar, curYear, monthIndex);
}
//renderMiniCal()

function createCalendar(elem, year, month) {
  //original function, creates table format

  let mon = month - 1; // months in JS are 0..11, not 1..12
  let d = new Date(year, mon);
  let options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  let monthTitle = d.toLocaleDateString([], {
    month: "long",
    year: "numeric",
  });

  let table = `<table>
          <tr>
            <th colspan="7">
              <h4>${monthTitle}</h4>
            </th>
          </tr>
          <tr>
              <th>
                <span class="weekday">MO</span>
              </th>
              <th>
                <span class="weekday">TU</span>
              </th>
              <th>
                <span class="weekday">WE</span>
              </th>
              <th>
                <span class="weekday">TH</span>
              </th>
              <th>
                <span class="weekday">FR</span>
              </th>
              <th>
              <span class="weekday">SA</span>  
              </th>
              <th>
               <span class="weekday">SU</span> 
              </th>
          </tr>
          <tr>`;

  // spaces for the first row
  // from Monday till the first day of the month
  // * * * 1  2  3  4
  for (let i = 0; i < getDay(d); i++) {
    table += "<td><span></span></td>";
  }

  // <td> with actual dates
  while (d.getMonth() == mon) {
    let dateid = d.toLocaleDateString([], options);
    dateid = dateid.replace(/\//g, "-");
    table += `<td class="${dateid}"><span id="${dateid}">${d.getDate()}</span></td>`;
    /*
    table += `<td class="${dateid}"><span id="${dateid}" class="${dateid}">${d.getDate()}</span></td>`;
    */
    if (getDay(d) % 7 == 6) {
      // sunday, last day of week - newline
      table += `</tr><tr>`;
    }

    d.setDate(d.getDate() + 1);
  }

  // add spaces after last days of month for the last row
  // 29 30 31 * * * *
  if (getDay(d) != 0) {
    for (let i = getDay(d); i < 7; i++) {
      table += "<td><span></span></td>";
    }
  }

  // close the table
  table += "</tr></table>";

  elem.innerHTML = table;
}

function createStyledCalendar(elem, year, month) {
  //create the minical styled ver (uses spans for some reason)

  let mon = month - 1; // months in JS are 0..11, not 1..12
  let d = new Date(year, mon);
  /* let day = d.getDay() */
  let options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  let monthTitle = d.toLocaleDateString([], {
    month: "long",
    year: "numeric",
  });

  let table = `<h4>${monthTitle}</h4>
      <span class="weekday">MO</span>
      <span class="weekday">TU</span>
      <span class="weekday">WE</span>
      <span class="weekday">TH</span>
      <span class="weekday">FR</span>
      <span class="weekday">SA</span>
      <span class="weekday">SU</span>`;

  // spaces for the first row
  // from Monday till the first day of the month
  // * * * 1  2  3  4
  for (let i = 0; i < getDay(d); i++) {
    table += `<span></span>`;
  }

  // <span> with actual dates
  while (d.getMonth() == mon) {
    let dateid = d.toLocaleDateString([], options);
    dateid = dateid.replace(/\//g, "-");
    table += `<span id="${dateid}" class="${dateid}">${d.getDate()}</span>`;

    /* if (getDay(d) % 7 == 6) { // sunday, last day of week - newline
        table += '</tr><tr>';
      } */

    d.setDate(d.getDate() + 1);
  }

  // add spaces after last days of month for the last row
  // 29 30 31 * * * *
  if (getDay(d) != 0) {
    for (let i = getDay(d); i < 7; i++) {
      table += `<span></span>`;
    }
  }

  // close the table
  //table += '</tr></table>';

  elem.innerHTML = table;
}
function getDay(date) {
  // get day number from 0 (monday) to 6 (sunday)
  let day = date.getDay();
  if (day == 0) day = 7; // make Sunday (0) the last day
  return day - 1;
}

function buildMiniCal(elem, futuremonths = 0) {
  let monthcalc = calcFutureMonths(futuremonths);
    createCalendar(elem, monthcalc.year, monthcalc.month);
    boldToday();
}

function boldToday() {
  let date = new Date();
  let options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  let dateid = date.toLocaleDateString([], options);
  dateid = dateid.replace(/\//g, "-");
    let today = document.getElementById(dateid);
    console.log(today);
    let todays = document.getElementsByClassName(dateid);
    console.log(todays);
  for (i = 0; i < todays.length; i++) {
      let onetoday = todays[i];
      console.log(onetoday);
    let oneog = onetoday.innerHTML;
    onetoday.innerHTML = `<b class="today-block">${oneog}</b>`;
    onetoday.title = "today";
    onetoday.classList.add("today-block");
  }
  /*  let og = today.innerHTML;
      today.innerHTML = `<b class="today-block">${og}</b>`; */
}

function addEventsTest(datestring) { // just for testing purposes
  //just for testing purposes
    let eventdays = document.getElementsByClassName(datestring);
    
  for (i = 0; i < eventdays.length; i++) {
    let eventday = eventdays[i];
    let og = eventday.innerHTML;
    eventday.innerHTML = `<b class="event-info">${og}</b>`;
    eventday.title = `this is the event title for ${datestring}`;
    eventday.classList.add("event-info");
  }
}

function addEvents(eventsarray) {
    for (i = 0; i < eventsarray.length; i++){
        let event = eventsarray[i];
        let eventdatestr = eventsarray.date;
        let eventtitle = eventsarray.title;
        }
}