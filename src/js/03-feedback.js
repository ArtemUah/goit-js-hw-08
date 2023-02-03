var throttle = require('lodash.throttle');

const StorageKeyForForm = 'feedback-form-state';
let data = {
  email: '',
  message: '',
};
if (localStorage.getItem(StorageKeyForForm)) {
  const object = JSON.parse(localStorage.getItem(StorageKeyForForm));
  data.email = object.email;
  data.message = object.message;
}

const feedbackForm = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');

window.addEventListener('load', load(StorageKeyForForm));
feedbackForm.addEventListener('input', throttle(handleGetInputText, 500));
feedbackForm.addEventListener('submit', handleFormReset);

function save(key, value) {
  try {
    const serializedData = JSON.stringify(value);
    localStorage.setItem(key, serializedData);
  } catch (err) {
    console.error(err);
  }
}

function handleGetInputText({ target }) {
  data[target.name] = target.value;
  save(StorageKeyForForm, data);
}

function load(key) {
  try {
    const serializedState = localStorage.getItem(key);
    const object = JSON.parse(serializedState);
    input.value = object.email;
    textarea.value = object.message;
  } catch (err) {
    console.error('error');
  }
}

function handleFormReset(event) {
  event.preventDefault();
  let serializedState = JSON.parse(localStorage.getItem(StorageKeyForForm));
  serializedState ? serializedState : (serializedState = data);
  console.log(serializedState);
  localStorage.removeItem(StorageKeyForForm);
  feedbackForm.reset();
  data = {
    email: '',
    message: '',
  };
}
