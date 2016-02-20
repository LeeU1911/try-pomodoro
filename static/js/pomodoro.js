var minute = 0;
var second = 3;
var interval = undefined;
var isPause = false;
function initPomodoro(){
  minute = 0;
  second = 3;
}

function initBreak(){
  minute = 0;
  second = 3;
}
function startPomodoro(){
  initPomodoro();
  var message = "One Pomodoro is done! Now take a 5-minute break!";
  interval = setInterval(startTimer, 1000, doneNotification, message, startBreak);
}
function startTimer(notification, message, nextStep){
  if(isPause){
    return;
  }
  second--;
  document.getElementById('timer').innerHTML = checkTime(minute) + ":"
    + checkTime(second);
  if(second == 0){
    if(minute == 0){
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
function doneNotification(message, nextStep){
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

  clearInterval(interval);
  nextStep();
}

function startBreak(){
  initBreak();
  var message = "Break is done! Now start another Pomodoro";
  interval = setInterval(startTimer, 1000, doneNotification, message, startPomodoro);
}

function pauseTimer(){
  isPause = !isPause;
  if(isPause){
    document.getElementById('pauseButton').innerHTML = 'Resume';
  }else{
    document.getElementById('pauseButton').innerHTML = 'Pause';
  }
}
