"use strict";

const currentTime = new Date();

const currentHour = currentTime.getHours();
const currentMinute = currentTime.getMinutes();
const currentSecond = currentTime.getSeconds();

console.log(`Current Time: ${currentTime}`);
console.log(`Hour: ${currentHour}`);
console.log(`Minute: ${currentMinute}`);
console.log(`Seconds: ${currentSecond}`);
