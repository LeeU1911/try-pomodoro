var isBreak = false;
var breakCount = 0;
var breakDoneEvent = new Event('breakDone');

const breakDoneListener = function(e){
  breakCount++;
};

timer.addEventListener('breakDone', breakDoneListener);

function startBreak(){
  isBreak = true;
  if(pomodoroCount > 0 && pomodoroCount % 4 == 0){
    initLongBreak();
  }else{
    initShortBreak();
  }
  message = `<div style="border: 5px solid tomato; color:tomato; background:rgba(255, 102, 47, .3);">BREAK OVER🔥<br>Starting POMODORO!</div>`;

  interval = setInterval(startTimer, 1000, types.BREAK, doneNInvokeNextStep, message, startPomodoro, breakDoneEvent);
}

function initShortBreak(){
  initTimer(4, 60);
  // initTimer(0, 2);
}

function initLongBreak(){
  initTimer(14, 60);
  // initTimer(0, 6);
}
