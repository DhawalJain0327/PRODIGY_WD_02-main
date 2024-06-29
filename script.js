let timer;
let startTime;
let elapsedTime = 0;
let laps = [];

const display = document.querySelector('.display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
    const date = new Date(ms);
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(function() {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
    startButton.disabled = true;
    pauseButton.disabled = false;
    lapButton.disabled = false;
}

function pauseTimer() {
    clearInterval(timer);
    startButton.disabled = false;
    pauseButton.disabled = true;
}

function resetTimer() {
    clearInterval(timer);
    elapsedTime = 0;
    laps = [];
    updateDisplay();
    lapsList.innerHTML = '';
    startButton.disabled = false;
    pauseButton.disabled = true;
    lapButton.disabled = true;
}

function lap() {
    laps.push(elapsedTime);
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${laps.length}: ${lapTime}`;
    lapsList.appendChild(lapItem);
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lap);

display.addEventListener('click', function() {
    if (laps.length > 0) {
        const currentLapIndex = laps.length - 1;
        const currentLapTime = laps[currentLapIndex];
        display.textContent = formatTime(currentLapTime);
    }
});
