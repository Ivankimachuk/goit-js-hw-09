import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const datetimePicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;
let countInterval;
let selectedDateTime;

flatpickr(datetimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      const currentDate = new Date();
      
      if (selectedDate <= currentDate) {
        window.alert("Please choose a date in the future");
        startBtn.disabled = true;
      } else {
        startBtn.disabled = false;
        selectedDateTime = selectedDate;
      }
    },
  });

  startBtn.addEventListener('click', ()=> {
    const currentDateTime = new Date();
    const readout = selectedDateTime.getTime() - currentDateTime.getTime();

    if(readout > 0) {
        startReadout(readout);
    }
  });

  function startReadout(readout) {
    clearInterval(countInterval);

    countInterval= setInterval(() => {
        if(readout <= 0) {
            clearInterval(countInterval);
            dataDays.textContent = '00';
            dataHours.textContent = '00';
            dataMinutes.textContent = '00';
            dataSeconds.textContent = '00';
            return;
        }

        const currentDateTime = new Date();
        const remainingTime = selectedDateTime.getTime() - currentDateTime.getTime();
        const { days, hours, minutes, seconds } = convertMs(remainingTime);

        dataDays.textContent = addLeadingZero(days);
        dataHours.textContent = addLeadingZero(hours);
        dataMinutes.textContent = addLeadingZero(minutes);
        dataSeconds.textContent = addLeadingZero(seconds);
       

        readout -= 1000;
    }, 1000);
  }


  function convertMs(ms) {
    
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }
    

