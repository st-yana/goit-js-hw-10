import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

let selectedDate;

const startButton = document.querySelector('button');
const dateInput = document.querySelector('input#datetime-picker');

flatpickr(dateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    console.log(selectedDates);
    const now = Date.now();
    const selectedDateIsInFuture = (selectedDate - now) > 0;

    if (selectedDateIsInFuture) {
      startButton.disabled = false;
    } else {
      startButton.disabled = true;
      iziToast.error({ message: 'Please choose a date in the future', position: 'topRight' });
    }
  },
});

const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let interval;

startButton.addEventListener('click', (e) => {
  startButton.disabled = true;
  dateInput.disabled = true;
  const remainingTimeMs = selectedDate - Date.now();
  updateTimerView(remainingTimeMs);

  interval = setInterval(() => {
    const remainingTimeMs = selectedDate - Date.now();

    if (remainingTimeMs < 1000) {
      dateInput.disabled = false;
      startButton.disabled = false;
      clearInterval(interval);
      interval = null;
      secondsElement.innerHTML = addLeadingZero(0);
      return;
    }

    updateTimerView(remainingTimeMs);
  }, 1000);
});

function updateTimerView(remainingTimeMs) {
  const { days, hours, minutes, seconds } = convertMs(remainingTimeMs);

  daysElement.innerHTML = addLeadingZero(days);
  hoursElement.innerHTML = addLeadingZero(hours);
  minutesElement.innerHTML = addLeadingZero(minutes);
  secondsElement.innerHTML = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
