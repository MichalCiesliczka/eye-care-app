import { TIME_PERIODS } from './constans';

let interval: number;
let workAgainTimeout: NodeJS.Timer;
let lookAwayNotification: Notification;
let workNotification: Notification;

const $statusIndicatorElement = document.querySelector(
  '[data-js="statusIndicator"]',
);

document
  .querySelector('[data-js="timerStart"]')
  .addEventListener('click', () => {
    makeInterval();

    $statusIndicatorElement.classList.add('active');
    $statusIndicatorElement.innerHTML = 'Active';
  });
document
  .querySelector('[data-js="timerStop"]')
  .addEventListener('click', () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
      clearTimeout(workAgainTimeout);

      $statusIndicatorElement.classList.remove('active');
      $statusIndicatorElement.innerHTML = 'Not active';
    }
  });

const showEyeCareNotification = () => {
  lookAwayNotification = new Notification('Time to rest!', {
    body: 'Look 20ft away for 20s.',
  });
};

const showWorkNotification = () => {
  workNotification = new Notification('Pause over!', {
    body: 'Get back to work, mate!',
  });
};

const createNotificationScheme = () => {
  showEyeCareNotification();
  workAgainTimeout = setTimeout(() => {
    showWorkNotification();
  }, TIME_PERIODS.workAgain);
};

const makeInterval = () => {
  if (interval) {
    return;
  }
  createNotificationScheme();

  interval = window.setInterval(() => {
    createNotificationScheme();
  }, TIME_PERIODS.lookAway);
};
