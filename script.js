"use strict";

const AmPm = document.getElementById("am_pm");
const alarmSound = document.getElementById("alarmSound");

class Clock {
  constructor(hours, minutes, seconds) {
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  getFormattedTime() {
    AmPm.style.display = "none";
    return `${this.hours.toString().padStart(2, "0")}:${this.minutes
      .toString()
      .padStart(2, "0")}:${this.seconds.toString().padStart(2, "0")}`;
  }

  get12HourTime() {
    let hours = this.hours;
    const period = hours >= 12 ? "PM" : "AM";

    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;

    AmPm.style.display = "block";
    AmPm.textContent = period;

    return `${hours.toString().padStart(2, "0")}:${this.minutes
      .toString()
      .padStart(2, "0")}:${this.seconds.toString().padStart(2, "0")}`;
  }
}

let alarmTime = null;
let is24HourFormat = true;

const setAlarm = () => {
  const alarmHour = parseInt(document.getElementById("alarmHour").value, 10);
  const alarmMinute = parseInt(
    document.getElementById("alarmMinute").value,
    10
  );
  const format = document.getElementById("format").value;
  let period = null;

  if (format === "12") {
    period = document.querySelector('input[name="period"]:checked').value;
  }

  if (isNaN(alarmHour) || isNaN(alarmMinute) || (format === "12" && !period)) {
    alert("Please enter valid hour, minute, and period for the alarm.");
    return;
  }

  alarmTime = { hours: alarmHour, minutes: alarmMinute, period };
  is24HourFormat = format === "24";

  alert(
    `Alarm set for ${alarmHour.toString().padStart(2, "0")}:${alarmMinute
      .toString()
      .padStart(2, "0")}${period ? ` ${period}` : ""}`
  );
};

const stopAlarm = () => {
  if (alarmSound) {
    alarmSound.pause();
    alarmSound.currentTime = 0;
  }
};

const checkAlarm = (currentClock) => {
  if (!alarmTime) return;

  const currentHour = is24HourFormat
    ? currentClock.hours
    : currentClock.hours % 12 || 12;
  const currentPeriod = currentClock.hours >= 12 ? "PM" : "AM";

  if (
    currentHour === alarmTime.hours &&
    currentClock.minutes === alarmTime.minutes &&
    (is24HourFormat || currentPeriod === alarmTime.period)
  ) {
    alarmSound.play();
    alert("Alarm ringing!");
    alarmTime = null; // Reset alarm after it rings
  }
};

const updateClock = () => {
  const clockDiv = document.getElementById("clock");
  const format = document.getElementById("format").value;
  const timeZoneOffset = parseInt(
    document.getElementById("timezone").value,
    10
  );
  const color = document.getElementById("color").value;

  const now = new Date();
  const localTime = new Date(now.getTime() + timeZoneOffset * 60 * 60 * 1000);

  const currentClock = new Clock(
    localTime.getUTCHours(),
    localTime.getUTCMinutes(),
    localTime.getUTCSeconds()
  );

  clockDiv.style.color = color;

  if (format === "24") {
    clockDiv.textContent = currentClock.getFormattedTime();
  } else {
    clockDiv.textContent = currentClock.get12HourTime();
  }

  checkAlarm(currentClock);
};

setInterval(updateClock, 1000);
updateClock();

document.getElementById("format").addEventListener("change", () => {
  document.getElementById("periodSelector").style.display =
    document.getElementById("format").value === "12" ? "block" : "none";
  updateClock();
});
document.getElementById("timezone").addEventListener("input", updateClock);
document.getElementById("color").addEventListener("input", updateClock);
document.getElementById("setAlarm").addEventListener("click", setAlarm);

// Stop the alarm sound on key press, mouse move, or click
document.addEventListener("keydown", stopAlarm);
document.addEventListener("mousemove", stopAlarm);
document.addEventListener("click", stopAlarm);
