var isPause = false;
var isReset = false;
var startPause = 0;
var endPause = 0;

var totaltimectr = true;

function startTheDay(){
  if(isReset){
    clearInterval(interval);
    updateTimer(25, 00, types.POMODORO);
    changeMainButtonText("Start your Pomorodo!");
    isReset = false;
    //When the user resets we pause the timer
    isPause = true;
  }
  else{
    changeMainButtonText("Reset");
    startPomodoro();
    isPause = false;
    totaltimectr = false;
  }
  showResume();
  messageBreak.classList.add('hidden');

}

function pauseTimer(){
  isPause = !isPause;
  updatePauseButton();
}

function updatePauseButton(){
  if(isPause){
    startPause = performance.now();
    changePauseButtonText('Resume');
  }else{
    endPause = performance.now()
    timeStampDuration = endPause - startPause;
    runInterruptions(timeStampDuration);
    changePauseButtonText('Pause');
  }
}

function changePauseButtonText(text){
  document.getElementById('pauseButton').innerHTML = text;
}

function changeMainButtonText(text){
  document.getElementById('mainButton').innerHTML = text;
  isReset = true;
}
function showResume(){
  document.getElementById('pauseButton').classList.toggle("hidden");
}
