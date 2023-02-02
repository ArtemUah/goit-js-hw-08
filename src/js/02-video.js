import Player from '@vimeo/player';
var throttle = require('lodash.throttle');

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);
const StorageKey = 'videoplayer-current-time';

window.addEventListener('load', hanleDefaultSettings);

function hanleDefaultSettings(event) {
const setTime = load(StorageKey);
 if(setTime !== 0) player.setCurrentTime(setTime);
}

const onPlay = function ({seconds}) {
  save(StorageKey, seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

function save(key, value) {
  try {
    const serializedData = JSON.stringify(value);
    localStorage.setItem(key, serializedData);
  } catch (err) {
    console.error(err);
  }
}

function load(key) {
  try {
    const serializedState = JSON.parse(localStorage.getItem(key));
    return serializedState === null ? 0 : serializedState;
  } catch (err) {
    console.error(err);
  }
}
