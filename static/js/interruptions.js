const dropdown = document.querySelector('.dropdown');
const dropBtn = dropdown.querySelector('.dropbtn');
const dropDownContent = dropdown.querySelector('.dropdown-content');
const timeInterrupted = document.querySelector('.timeInterrupted');
const nbInterruptions = document.querySelector('.nbInterruptions');

dropdown.addEventListener("click", () => {
  dropDownContent.classList.toggle('dropdown-content-hidden');
  if (dropBtn.children[1].innerText === "🔼" )
    dropBtn.children[1].innerText = "🔽";
  else
    dropBtn.children[1].innerText = "🔼"
});
function runInterruptions (timeStampDuration) {
  const newTime = getPrettyTime(timeStampDuration, 'ms');
  addNewDropDownTime(newTime);
  updateTotalInterruptions(newTime);
}

function addNewDropDownTime(newTime) {
  let a = document.createElement("a");
  a.innerHTML =
    `
      <span>AT(${(title.innerText).split(" ")[0]}): ${timer.innerText}</span>
      <span>Duration: ${newTime}</span>
    `;
  dropDownContent.appendChild(a);
}

function updateTotalInterruptions(newTime) {
  console.log(newTime);
  let curr_totalTimeInterrupted = timeInterrupted.innerText;
  curr_totalTimeInterrupted = getTotalTimeInterruptions (curr_totalTimeInterrupted, newTime);
  timeInterrupted.innerText = curr_totalTimeInterrupted;

  nbInterruptions.innerText = parseInt(nbInterruptions.innerText) + 1;
}

const getTotalTimeInterruptions = (curr_totalTimeInterrupted, newInterruptionTime) => {

  const curr_minute_seconds = curr_totalTimeInterrupted.replace(/[ms]/gi, "").split(":").map( e => parseInt(e) );
  // console.log("curr_minute_seconds ", curr_minute_seconds);
  const newTime_minute_seconds = newInterruptionTime.replace(/[ms]/gi, "").split(":").map( e => parseInt(e) );
  // console.log("newTime_minute_seconds ", newTime_minute_seconds);

  const totalSeconds = (curr_minute_seconds[1] + newTime_minute_seconds[1])%60;
  // console.log("totalSeconds ", totalSeconds);
  let totalMinutes = parseInt((curr_minute_seconds[1] + newTime_minute_seconds[1])/60);
  // console.log("totalMinutes Additional",totalMinutes);
  totalMinutes += curr_minute_seconds[0] + newTime_minute_seconds[0];
  // console.log("totalMinutes ",totalMinutes);
  return `${totalMinutes}m:${totalSeconds}s`;
}
