var throttle = require('lodash.throttle');

const StorageKeyForForm = 'feedback-form-state';
const data = {
  email: '',
  message: '',
};

const feedbackForm = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');

function save(key, value) {
  try {
    const serializedData = JSON.stringify(value);
    localStorage.setItem(key, serializedData);
  } catch (err) {
    console.error(err);
  }
}

feedbackForm.addEventListener('input', throttle(handleGetInputText, 500));

function handleGetInputText({ target }) {
  if (target.tagName === 'INPUT') {
    data.email = target.value;
  }
  if (target.tagName === 'TEXTAREA') {
    data.message = target.value;
  }
  save(StorageKeyForForm, data);
}

window.addEventListener('load', load(StorageKeyForForm));

function load(key) {
  try {
    const serializedState = localStorage.getItem(key);
    const object = JSON.parse(serializedState);
    if (object !== null) {
      input.value = object.email;
      textarea.value = object.message;
    } else {
      input.value = '';
      textarea.value = '';
    }
  } catch (err) {
    console.error('error');
  }
}

feedbackForm.addEventListener('submit', handleFormReset);

function handleFormReset(event) {
  event.preventDefault();
  const serializedState = localStorage.getItem(StorageKeyForForm);
  console.log(JSON.parse(serializedState));
  localStorage.removeItem(StorageKeyForForm);
  feedbackForm.reset();
}
