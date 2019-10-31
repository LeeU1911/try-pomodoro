var minute = 24;
var second = 60;
var interval = undefined;
var message = "";
var pomodoroCount = 0;
var pomodoroDoneEvent = new Event('pomodoroDone');
var breakDoneEvent = new Event('breakDone'); 
var musicActive = false;
var musicPlayer = new Audio();
musicPlayer.loop = true;

const  musicList = [
  {
    name: 'Gentle rain sounds',
    src: '/audio/Gentle-rain-sounds.mp3'
  },
  {
    name: 'Boat engine and waves',
    src: '/audio/Boat-engine-and-waves.mp3'
  }
];
var musicSelector = document.getElementById('player-selector');
musicList.forEach(music => {
  musicSelector.add(new Option(music.name, music.src));
});

var messageBreak = document.querySelector('.message');
const types = {POMODORO: 'Pomodoro', BREAK: 'break'};
var numOfPomodoro = document.getElementById('pomodoro-done');
const updatePomodoroCountListener = function(e){
  updatePomodoroCount();
};

timer.addEventListener('pomodoroDone', updatePomodoroCountListener);
timer.addEventListener('breakDone', breakDoneListener);

function startTheDay(){
  if(isReset){
    clearInterval(interval);
    updateTimer(25, 00, types.POMODORO);
    changeMainButtonText("Start your Pomorodo!");
    isReset = false;
    //When the user resets we pause the timer
    isPause = true;
    musicPlayer.pause();
  }
  else{
    changeMainButtonText("Reset");
    startPomodoro();
    isPause = false;
    playMusic();
  }
  updatePauseButton();

}

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
    new Notification(message);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        new Notification(message);
      }
    });
  } else {
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
  if (!isPause && musicActive) {
    musicPlayer.play();
  } else {
    musicPlayer.pause();
  }
  updatePauseButton();
}

function updatePauseButton(){
  if(isPause){
    changePauseButtonText('Resume');
  }else{
    changePauseButtonText('Pause');
  }
}

function changePauseButtonText(text){
  document.getElementById('pauseButton').innerHTML = text;
}

}

function bing(){
  var audio = new Audio('../audio/alarm.mp3');
  audio.play();
}

function toggleMusic() {
  musicActive = !musicActive;
  const player = document.getElementById('player');

  if (musicActive) {
    player.classList.add('on');
    if (!isPause && interval) {
      playMusic();
    } else {
      musicPlayer.pause();
    }
  } else {
    player.classList.remove('on');
    musicPlayer.pause();
  }
  
}

function playMusic() {
  if (!musicActive) {
    return;
  }
  const currentMusic = document.getElementById('player-selector').value;
  musicPlayer.src = currentMusic;
  musicPlayer.play();
}

function setMusic() {
  const currentMusic = document.getElementById('player-selector').value;
  musicPlayer.src = currentMusic;

  if (!isPause && musicActive && interval) {
    musicPlayer.play();
  }
}