var timer = document.getElementById('timer');
var title = document.getElementsByTagName("title")[0];

function getPrettyTimeBase(timeStamp, base) {
  return `${parseInt(timeStamp/base[0])}m:${parseInt((timeStamp%base[0])/base[1])}s`
}
function getPrettyTime(timeStamp, unit)
{
  if(unit==="ms")
  {
    return getPrettyTimeBase(timeStamp, [60000, 1000]);
  }
}
function initTimer(min, sec){
  minute = min;
  second = sec;
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
  var time =  checkTime(minute) + ":"
    + checkTime(second);
  timer.innerHTML = time;
  if(type == types.POMODORO){
    title.innerHTML = "Pomodoro (" + time + ")";
  }else if(type == types.BREAK){
    title.innerHTML = "Break (" + time + ")";
  }

}

function checkTime(i){
  if(i < 10) {
    i = "0" + i;
  }
  return i;
}
