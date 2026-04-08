const button = document.querySelector('#action-button');
const result = document.querySelector('#result');

button.addEventListener('click', () => {
  const timestamp = new Date().toLocaleTimeString();
  result.textContent = `App is live! Click detected at ${timestamp}.`;
});
