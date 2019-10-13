var express = require('express');
var app = express();
var compress = require('compression');

const PORT = process.env.PORT || 8081;

app.set('views', './static/views');
app.set('view engine', 'jade');

app.use(compress());
app.use(express.static('build'));
app.use(express.static('static'));


var title = "Pomodoro app notification sound"
var helloMessage = "Hey, there! Welcome to Pomodoro app!";

app.get('/', function(req, res){
  res.render('index', {title: title, message: helloMessage})
})

var server = app.listen(PORT, function(){
  console.log("App is running on port %s", PORT);
})

const got = require('got');
const moment = require('moment');
const loopSeconds = 120;
const myLoc = { latitude: 32.715738, longitude: -117.161084 };
const url = `http://api.open-notify.org/iss-pass.json?lat=${myLoc.latitude}&lon=${myLoc.longitude}`;
const warningMinutes = 30;
let providedNotification = false;
let alarmAcknowledged = false;
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        process.exit();
    } else if (key.name === 'a') {
        if (!alarmAcknowledged) {
            console.log('alarm acknowledged');
        }
        alarmAcknowledged = true;
    }
});
function sendNotification(message) {
    console.log(`Could send email here: ${message}`);
}
function soundAlarm() {
    console.log('playing sound');
}
function loop() {
    got(url, { json: true })
        .then(iss => {
            const nextPasses = iss.body.response;
            const now = moment();
            const pass = nextPasses[0];
            const passTime = moment.unix(pass.risetime);
            const timeFromNow = moment.duration(passTime.diff(now));
            const minutesFromNow = Number(timeFromNow.asMinutes()).toFixed(1);
            console.log(`${passTime} (in ${minutesFromNow} minutes) for ${pass.duration} seconds`);
            if (minutesFromNow <= warningMinutes) { if (!alarmAcknowledged) { soundAlarm(); } if (!providedNotification) { sendNotification(`The ISS will pass over in ${minutesFromNow} minutes`); providedNotification = true; } } else { providedNotification = false; alarmAcknowledged = false; } }) .catch(error => {
            console.log(error.response.body);
        });
    setTimeout(loop, loopSeconds * 1000);
}
loop();
