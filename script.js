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
