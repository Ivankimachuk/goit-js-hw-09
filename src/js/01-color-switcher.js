const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let intervalColor = null;

startBtn.addEventListener('click', startRandomColor);
stopBtn.addEventListener('click', stopRandomColor);

startBtn.style.fontSize = '30px'; 
stopBtn.style.fontSize = '30px';
startBtn.style.margin = '10px';

function startRandomColor() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    intervalColor = setInterval(changeBodyColor, 1000);
}
    
    

function stopRandomColor() {
    clearInterval(intervalColor);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

function changeBodyColor() {
    const randomColor =  getRandomHexColor();
    body.style.backgroundColor = randomColor;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }
