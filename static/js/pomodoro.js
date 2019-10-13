var minute = 24;
var second = 60;
var interval = undefined;
var isPause = false;
var isReset = false;
var pomodoroCount = 0;
var breakCount = 0;
var pomodoroDoneEvent = new Event('pomodoroDone');
var breakDoneEvent = new Event('breakDone');

const types = {POMODORO: 'Pomodoro', BREAK: 'break'};

// UI Elements
var pauseButton = document.getElementById('pauseButton');
var mainButton = document.getElementById('mainButton');
var timer = document.getElementById('timer');
var numOfPomodoro = document.getElementById('pomodoro-done');

function startTheDay(){
  timer.addEventListener('pomodoroDone', updatePomodoroCount.bind(this), false);
  timer.addEventListener('breakDone', updateBreakCount.bind(this), false);
  startPomodoro();
}

function updateBreakCount(){
  breakCount++;
}

function updatePomodoroCount(){
  pomodoroCount++;
  numOfPomodoro.innerHTML += "X "
}
function initTimer(min, sec){
  minute = min;
  second = sec;
}
function initPomodoro(){
  initTimer(24, 60);
  // initTimer(0, 5);
}

function initShortBreak(){
  initTimer(4, 60);
  // initTimer(0, 3);
}

function initLongBreak(){
  initTimer(14, 60);
  // initTimer(0, 7);
}
function startPomodoro(){
  if(isReset){
    clearInterval(interval);
	updateTimer(25, 00, types.POMODORO);
  }else{
    changeMainButtonText("Reset");
  }
  initPomodoro();
  var message = "1 Pomodoro is done! Now take a 5-minute short-break!";
  if(pomodoroCount > 0 && pomodoroCount % 3 == 0){
    message = "4 Pomodoro is done! Now take a 15-minute long-break!";
  }
  interval = setInterval(startTimer, 1000, types.POMODORO, doneNInvokeNextStep, message, startBreak, pomodoroDoneEvent);
}
function startTimer(type, doneNInvokeNextStep, message, nextStep, event){
  if(isPause){
    return;
  }
  second--;
  updateTimer(minute, second, type);

  if(second == 0){
    if(minute == 0){
      if(event){
        timer.dispatchEvent(event);
      }
      doneNInvokeNextStep(message, nextStep);
      return;
    }else{
      minute--;
    }
    second = 59;
  }
}

function updateTimer(minute, second, type){
  var time =  checkTime(minute) + ":"+ checkTime(second);
  var title = document.getElementsByTagName("title")[0];
  timer.innerHTML = time;
  if(type == types.POMODORO){
    title.innerHTML = "Pomodoro (" + time + ")";
  }else if(type == types.BREAK){
    title.innerHTML = "Break (" + time + ")";
  }

}
function checkTime(i){
  return i < 10 ? "0" + i : i;
}
function doneNInvokeNextStep(message, nextStep){
  displayNotification(message);
  clearInterval(interval);
  nextStep();
}

function displayNotification(message){
  if (!("Notification" in window)) {
    alert(message);
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
    alert(message);
	  bing();
  }
}

function startBreak(){
  if(pomodoroCount > 0 && pomodoroCount % 4 == 0){
    initLongBreak();
  }else{
    initShortBreak();
  }
  var message = "Break is done! Now start another Pomodoro";
  interval = setInterval(startTimer, 1000, types.BREAK, doneNInvokeNextStep, message, startPomodoro, breakDoneEvent);
}

function pauseTimer(){
  isPause = !isPause;
  if(isPause){
    changePauseButtonText('Resume');
  }else{
    changePauseButtonText('Pause');
  }
}

function changePauseButtonText(text){
  pauseButton.innerHTML = text;
}

function changeMainButtonText(text){
  mainButton.innerHTML = text;
  isReset = true;
}

function bing(){
  var audio = new Audio('../../alarm.mp3');
  audio.play();
}
