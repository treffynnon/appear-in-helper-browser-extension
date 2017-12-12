import * as store from '../utils/store';
import { getSettings } from '../utils/settings';
import { navigateToRoom } from '../utils/redirect';

import './myRooms';

const version = document.createElement('small');
version.classList.add('version-number');
version.innerText = chrome.runtime.getManifest().version;
document.getElementById('container').appendChild(version);

const update = async e => {
  const urlParam = e.target.getAttribute('data-url-param');
  if (urlParam) {
    const setting = {};
    setting[urlParam] = e.target.checked;
    await store.set(setting);
  }
};

const settingsDiv = document.getElementById('default-room-settings');
const settingsInputs = settingsDiv.getElementsByTagName('input');

getSettings()
  .then(existingSettings => {
    Array.from(settingsInputs).forEach(c => {
      c.checked = existingSettings[c.getAttribute('data-url-param')];
      c.addEventListener('click', update);
    });
  });

document.getElementById('open-options-page')
  .addEventListener('click', () => chrome.runtime.openOptionsPage());