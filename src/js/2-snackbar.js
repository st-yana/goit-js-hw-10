import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
const input = document.querySelector('input[name="delay"]');
const radios = document.querySelectorAll('input[name="state"]');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const delayMs = Number.parseInt(input.value);
  let promiseType = form.state.value;

  radios.forEach(radio => {
    if (radio.checked) {
      promiseType = radio.value;
    }
  });

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (promiseType === 'fulfilled') {
        resolve(delayMs);
      } else {
        reject(delayMs);
      }
    }, delayMs * 1000);
  }).then((successValue) => {
    iziToast.success({ message: `✅ Fulfilled promise in ${successValue}ms`, position: 'topRight' });
  }).catch((successValue) => {
    iziToast.error({ message: `❌ Rejected promise in ${successValue}ms`, position: 'topRight' });
  });
});



