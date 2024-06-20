"use strict";

const currentTime = new Date();

const currentHour = currentTime.getHours();
const currentMinute = currentTime.getMinutes();
const currentSecond = currentTime.getSeconds();

/*
console.log(`Current Time: ${currentTime}`);
console.log(`Hour: ${currentHour}`);
console.log(`Minute: ${currentMinute}`);
console.log(`Seconds: ${currentSecond}`);
*/

function Clock(hours, minutes, seconds) {
  this.hours = hours;
  this.minutes = minutes;
  this.seconds = seconds;
}

const currentClock = new Clock(
  currentTime.getHours(),
  currentTime.getMinutes(),
  currentTime.getSeconds()
);

/*
console.log(`Hours: ${currentClock.hours}`);
console.log(`Minutes: ${currentClock.minutes}`);
console.log(`Seconds: ${currentClock.seconds}`);
*/

// FormattedTime Method
Clock.prototype.getFormattedTime = function () {
  const formattedHours = this.hours.toString().padStart(2, "0");
  const formattedMinutes = this.minutes.toString().padStart(2, "0");
  const formattedSeconds = this.seconds.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

Clock.prototype.get12HourTime = function () {
  let hours = this.hours;
  let period = hours >= 12 ? "PM" : "AM";

  if (hours > 12) {
    hours -= 12;
  }

  if (hours === 0) hours = 12;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = this.minutes.toString().padStart(2, "0");
  const formattedSeconds = this.seconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${period}`;
};

/*
console.log(`(24-hour format): ${currentClock.getFormattedTime()}`);
console.log(`(12-hour format): ${currentClock.get12HourTime()}`);
*/
