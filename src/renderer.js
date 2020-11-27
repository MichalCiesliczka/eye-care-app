const TIME_PERIODS = {
  lookAway: 20 * 60 * 1000,
  workAgain: (20 + 2) * 1000, // NOTE: Additional 2 secs to make you notice this notification and look away
};

let interval;
let workAgainTimeout;
let lookAwayNotification;
let workNotification;

const $statusIndicatorElement = document.querySelector(
  '[data-js="statusIndicator"]',
);
const $toggleButton = document.querySelector('[data-js="timerToggle"]');

$toggleButton.addEventListener('click', () => {
  $statusIndicatorElement.classList.toggle('active');
  if (interval) {
    clearInterval(interval);
    interval = null;
    clearTimeout(workAgainTimeout);

    $toggleButton.innerHTML = 'Start timer'
    $statusIndicatorElement.innerHTML = 'Not active';
  } else {
    makeInterval();

    $toggleButton.innerHTML = 'Stop timer'
    $statusIndicatorElement.innerHTML = 'Active';
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
