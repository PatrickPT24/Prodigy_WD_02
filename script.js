// script.js

let timer;
let elapsedTime = 0;
let isRunning = false;
const display = document.querySelector('.display');
const laps = document.getElementById('laps');

function updateDisplay() {
    const ms = Math.floor((elapsedTime % 1000) / 10);
    const sec = Math.floor((elapsedTime / 1000) % 60);
    const min = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const hour = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

    display.textContent = `${pad(hour)}:${pad(min)}:${pad(sec)}.${pad(ms)}`;
}

function pad(number) {
    return number < 10 ? `0${number}` : number;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    const startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
}

function pauseTimer() {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    laps.innerHTML = '';
}

function recordLap() {
    if (!isRunning) return;
    const lapTime = display.textContent;
    const lapElement = document.createElement('li');
    lapElement.textContent = lapTime;
    laps.appendChild(lapElement);
}

document.querySelector('.start').addEventListener('click', startTimer);
document.querySelector('.pause').addEventListener('click', pauseTimer);
document.querySelector('.reset').addEventListener('click', resetTimer);
document.querySelector('.lap').addEventListener('click', recordLap);

updateDisplay();
