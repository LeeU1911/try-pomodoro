var minute = 24;
var second = 60;
var interval = undefined;
var message = "";
var pomodoroCount = 0;
var pomodoroDoneEvent = new Event('pomodoroDone');
var messageBreak = document.querySelector('.message');
const types = {POMODORO: 'Pomodoro', BREAK: 'break'};
var numOfPomodoro = document.getElementById('pomodoro-done');
const updatePomodoroCountListener = function(e){
  updatePomodoroCount();
};

timer.addEventListener('pomodoroDone', updatePomodoroCountListener);

function updatePomodoroCount(){
  pomodoroCount++;
  numOfPomodoro.innerHTML = pomodoroCount + "";
}

function initPomodoro(){
  initTimer(24, 60);
  // initTimer(0, 4);
}

function startPomodoro(){
  initPomodoro();
  message = `<div style="border: 5px solid green; color:green; background:lightgreen;">POMODORO ✔️<br>5-minutes BREAK!</div>`;

  if ( (pomodoroCount+1)%4 == 0 )
    message = `<div style="border: 5px solid green; color:green; background:lightgreen;">4-POMODOROS🏆<br>15-minutes BREAK!</div>`;

  interval = setInterval(startTimer, 1000, types.POMODORO, doneNInvokeNextStep, message, startBreak, pomodoroDoneEvent);
}

function doneNInvokeNextStep(message, nextStep){
  displayNotification(message);
  clearInterval(interval);
  nextStep();
}

function displayNotification(message){
  if(message!=""){
    messageBreak.innerHTML = message;
    messageBreak.classList.remove('hidden');
  }
  if (!("Notification" in window)) {
	  bing();
  } else if (Notification.permission === "granted") {
    var notification = new Notification(message);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        var notification = new Notification(message);
      }
    });
  } else {
	  bing();
  }
}

function bing(){
  var audio = new Audio('../audio/alarm.mp3');
  audio.play();
}
