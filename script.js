"use strict";
const AmPm = document.getElementById("am_pm");

function Clock(hours, minutes, seconds) {
  this.hours = hours;
  this.minutes = minutes;
  this.seconds = seconds;
}

// FormattedTime Method
Clock.prototype.getFormattedTime = function () {
  AmPm.style.display = "none";
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

  AmPm.style.display = "block";
  AmPm.textContent = period;

  if (hours === 0) hours = 12;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = this.minutes.toString().padStart(2, "0");
  const formattedSeconds = this.seconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

let alarmTime = null;
let is24HourFormat = true;

// Function to set the alarm
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

  alarmTime = {
    hours: alarmHour,
    minutes: alarmMinute,
    period: period,
  };
  is24HourFormat = format === "24";

  const displayHour = alarmHour.toString().padStart(2, "0");
  const displayMinute = alarmMinute.toString().padStart(2, "0");
  const displayPeriod = period ? ` ${period}` : "";
  alert(`Alarm set for ${displayHour}:${displayMinute}${displayPeriod}`);
};

// Function to check if the alarm time matches the current time
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
    document.getElementById("alarmSound").play();
    alert("Alarm ringing!");
    alarmTime = null; // Reset alarm after it rings
  }
};

// Function to update the clock display
const updateClock = () => {
  const clockDiv = document.getElementById("clock");
  const format = document.getElementById("format").value;
  const timeZoneOffset = parseInt(
    document.getElementById("timezone").value,
    10
  );
  const color = document.getElementById("color").value;

  const now = new Date();

  // Adjust time for time zone offset
  const localTime = new Date(now.getTime() + timeZoneOffset * 60 * 60 * 1000);

  const currentClock = new Clock(
    localTime.getUTCHours(),
    localTime.getUTCMinutes(),
    localTime.getUTCSeconds()
  );

  clockDiv.style.color = color;

  // Update the div content with the formatted time
  if (format === "24") {
    clockDiv.textContent = currentClock.getFormattedTime();
  } else {
    clockDiv.textContent = currentClock.get12HourTime();
  }

  // Check if the current time matches the alarm time
  checkAlarm(currentClock);
};

setInterval(updateClock, 1000);

updateClock();

// Adding event listeners to update clock immediately when customization options change
document.getElementById("format").addEventListener("change", () => {
  if (document.getElementById("format").value === "12") {
    document.getElementById("periodSelector").style.display = "block";
  } else {
    document.getElementById("periodSelector").style.display = "none";
    Am;
  }
  updateClock();
});
document.getElementById("timezone").addEventListener("input", updateClock);
document.getElementById("color").addEventListener("input", updateClock);

// Adding event listener to set the alarm
document.getElementById("setAlarm").addEventListener("click", setAlarm);
