var minute = 24;
var second = 60;
var interval = undefined;
var isPause = false;
var pomodoroCount = 0;
var pomodoroDoneEvent = new Event('pomodoroDone');

function startTheDay(){
  document.getElementById('timer').addEventListener('pomodoroDone', function(e){
    console.log(e);
    pomodoroCount++;
  }, false);
  startPomodoro();
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
  initPomodoro();
  var message = "1 Pomodoro is done! Now take a 5-minute short-break!";
  if(pomodoroCount > 0 && pomodoroCount % 3 == 0){
    message = "4 Pomodoro is done! Now take a 15-minute long-break!";
  }
  interval = setInterval(startTimer, 1000, doneNInvokeNextStep, message, startBreak, pomodoroDoneEvent);
}
function startTimer(notification, message, nextStep, event){
  if(isPause){
    return;
  }
  second--;
  document.getElementById('timer').innerHTML = checkTime(minute) + ":"
    + checkTime(second);
  if(second == 0){
    if(minute == 0){
      if(event){
        document.getElementById('timer').dispatchEvent(event);
      }
      notification(message, nextStep);
      return;
    }else{
      minute--;
    }
    second = 59;
  }
}
function checkTime(i){
  if(i < 10) {
    i = "0" + i;
  }
  return i;
}
function doneNInvokeNextStep(message, nextStep){
  displayNotification(message);
  clearInterval(interval);
  nextStep();
}

function displayNotification(message){
  if (!("Notification" in window)) {
    alert(message);
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
  }
}

function startBreak(){
  if(pomodoroCount > 0 && pomodoroCount % 4 == 0){
    initLongBreak();
  }else{
    initShortBreak();
  }
  var message = "Break is done! Now start another Pomodoro";
  interval = setInterval(startTimer, 1000, doneNInvokeNextStep, message, startPomodoro);
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
  document.getElementById('pauseButton').innerHTML = text;
}
