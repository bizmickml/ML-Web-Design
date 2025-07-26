const countdownCont = document.getElementById("countdown-container");
const msDay = 1000 * 60 * 60 * 24
const msHour = 1000 * 60 * 60
const msMinute = 1000 * 60
const msSecond = 1000
const timeLimitDays = 14
const timeLimitMS = timeLimitDays * msDay;
let daysLeft = 0;
let hoursLeft = 0;
let minutesLeft = 0;
let secondsLeft = 0;

const getTimeStamp = () => {
  const date = new Date();
  return date.getTime()
};

const convertTimeLeft = () => { 
  let time = timeLimitMS - (localStorage.getItem("visited") ? getTimeStamp() - parseInt(JSON.parse(localStorage.getItem("visited"))) : 0);

  daysLeft = time >= msDay ? Math.floor(time / msDay) : 0;
  time -= (daysLeft * msDay)
  hoursLeft = time > msHour ? Math.floor(time / msHour) : 0;
  time -= (hoursLeft * msHour)
  minutesLeft = time > msMinute ? Math.floor(time / msMinute) : 0;
  time -= (minutesLeft * msMinute)
  secondsLeft = time > msSecond ? Math.floor(time / msSecond) : 0;
  time -= (secondsLeft * msSecond)
}

const displayTimeLeft = (days, hours, minutes, seconds) => { 
  const dayCont = countdownCont.children[0]
  const hourCont = countdownCont.children[1]
  const minuteCont = countdownCont.children[2]
  const secondCont = countdownCont.children[3]
  
  dayCont.children[1].textContent = days
  hourCont.children[1].textContent = hours
  minuteCont.children[1].textContent = minutes
  secondCont.children[1].textContent = seconds
}

window.onload = () => { 
  if (!localStorage.getItem("visited")) {
    localStorage.setItem("visited", JSON.stringify(getTimeStamp()))
  }

  setInterval(() => {
    convertTimeLeft()
    displayTimeLeft(daysLeft, hoursLeft, minutesLeft, secondsLeft)
  }, 1000);
}