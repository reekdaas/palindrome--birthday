let dateInputRef = document.querySelector("#bday-input");
let showButton = document.querySelector("#show-btn");
let output = document.querySelector("#output");

let clickEventHandler = function () {
  let birthDay = dateInputRef.value;
  // console.log(birthDay);
  if (birthDay) {
    let listOfDates = birthDay.split("-");
    // console.log(listOfDates);
    let date = {
      day: Number(listOfDates[2]),
      month: Number(listOfDates[1]),
      year: Number(listOfDates[0]),
    };

    let isDatePalindrome = checkPalindrome(date);
    if (isDatePalindrome) {
      output.innerText = `Yayy!Your birthday is a palindrome 🤩🤩`;
    } else {
      let [countnext, nextPalindrome] = getNextPalindrome(date);
      let [countprev, previousPalindrome] = getPreviouPalindrome(date);
      output.innerText = `The next palindrome date is ${nextPalindrome.day}-${
        nextPalindrome.month
      }-${nextPalindrome.year}, you missed it by ${countnext} ${
        countnext > 1 ? "days" : "day"
      }! 🥴 and The previous palindrome date was ${previousPalindrome.day}-${
        previousPalindrome.month
      }-${previousPalindrome.year}, you missed it by ${countprev} ${
        countprev > 1 ? "days" : "day"
      }! 🥴`;
    }
  } else {
    output.innerText = `Please enter the date 🤬`;
  }
};

showButton.addEventListener("click", clickEventHandler);

function reverseStr(str) {
  let reverseString = str.split("").reverse().join("");
  return reverseString;
  // console.log(reverseString);
}
function isPalindrome(str) {
  const reverse = reverseStr(str);
  return str === reverse;
}
function changeDateToStr(date) {
  let dateStr = {
    day: "",
    month: "",
    year: "",
  };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;
}

function getAllDateFormat(date) {
  let dateStr = changeDateToStr(date);

  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}
function checkPalindrome(date) {
  let dateStringArr = getAllDateFormat(date);
  // return dateStringArr;
  let flag = false;
  for (let i = 0; i < dateStringArr.length; i++) {
    if (isPalindrome(dateStringArr[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  return year % 4 === 0 || year % 400 === 0;
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let daysInMonthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        month++;
        day = 1;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonthArr[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    year++;
    month = 1;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindrome(date) {
  let count = 0;
  let nextDate = getNextDate(date);
  // console.log(nextDate);
  while (1) {
    count++;
    let isPalindromeDate = checkPalindrome(nextDate);

    if (isPalindromeDate) {
      break;
    } else {
      nextDate = getNextDate(nextDate);
    }
  }
  return [count, nextDate];
}

function getPreviousDate(date) {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;
  let daysInMonthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day === 0) {
    month--;
    if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else {
      day = daysInMonthArr[month - 1];
    }
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPreviouPalindrome(date) {
  let count = 0;
  let previousDate = getPreviousDate(date);
  while (1) {
    count++;
    let isPalindrome = checkPalindrome(previousDate);
    if (isPalindrome) {
      break;
    }
    previousDate = getPreviousDate(previousDate);
  }
  return [count, previousDate];
}

// let date = {
//   day: 02,
//   month: 02,
//   year: 2020,
// };
// console.log(date);
// console.log(checkPalindrome(date));
// console.log(getNextPalindrome(date));
// console.log(getPreviouPalindrome(date));
