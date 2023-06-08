function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
  }

  const formEl = document.querySelector('.form');

  formEl.addEventListener('submit', (event) => {
    event.preventDefault();

    const delayInput = formEl.elements.delay;
    const stepInput = formEl.elements.step;
    const amountInput = formEl.elements.amount;

    const firstDelay = parseInt(delayInput.value);
    const step = parseInt(stepInput.value);
    const amount = parseInt(amountInput.value);

    let delay = firstDelay;

    for(let i = 1; i <= amount; i++) {
      createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
      delay += step;
    }
   
  formEl.reset();
  });


 
    
  


