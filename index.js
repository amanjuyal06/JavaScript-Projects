// Selecting elements from the HTML document
const timeDisplay = document.querySelector("#timeDisplay");
const start = document.querySelector("#start");
const pause = document.querySelector("#pause");
const reset = document.querySelector("#reset");

// Variables to track time and state of the timer
let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;

// Event listener for the "Start" button
start.addEventListener("click", () => {
    // Check if the timer is currently paused
    if (paused) {
        // If paused, set the start time and begin updating the time
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 1000); // Update time every 1000 milliseconds (1 second)
    }
});

// Event listener for the "Pause" button
pause.addEventListener("click", () => {
    // Check if the timer is currently running
    if (!paused) {
        // If running, pause the timer and record the elapsed time
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId); // Stop updating the time
    }
});

// Event listener for the "Reset" button
reset.addEventListener("click", () => {
    // Reset all timer-related variables and display
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    timeDisplay.textContent = "00:00:00"; // Display initial time
});

// Function to update the displayed time
function updateTime() {
    // Calculate elapsed time in hours, minutes, and seconds
    elapsedTime = Date.now() - startTime;
    secs = Math.floor((elapsedTime / 1000) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    // Pad single-digit seconds, minutes, and hours with leading zeros
    secs = pad(secs);
    mins = pad(mins);
    hrs = pad(hrs);

    // Display the formatted time
    timeDisplay.textContent = `${hrs}:${mins}:${secs}`;

    // Function to pad single-digit units with a leading zero
    function pad(unit) {
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }
}
