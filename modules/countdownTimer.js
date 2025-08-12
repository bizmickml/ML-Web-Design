export default async function displayCountdownTimer(timerWrapper) {
  timerWrapper.innerHTML = `
    <div class="title">Hurry! Special offer ends soon.</div>
    <div class="countdown-container">
      <div class="countdown-unit-container">
        <div class="countdown-label">Days</div>
        <div class="countdown-qty"></div>
      </div>
      <div class="countdown-unit-container">
        <div class="countdown-label">Hours</div>
        <div class="countdown-qty"></div>
      </div>
      <div class="countdown-unit-container">
        <div class="countdown-label">Minutes</div>
        <div class="countdown-qty"></div>
      </div>
      <div class="countdown-unit-container">
        <div class="countdown-label">Seconds</div>
        <div class="countdown-qty"></div>
      </div>
    </div>
  `;

  const msDay = 1000 * 60 * 60 * 24
  const msHour = 1000 * 60 * 60
  const msMinute = 1000 * 60
  const msSecond = 1000
  const timeLimitDays = 14
  const timeLimitMS = timeLimitDays * msDay;
  let timeStamp;
  let daysLeft = 0;
  let hoursLeft = 0;
  let minutesLeft = 0;
  let secondsLeft = 0;

    // Check if localStorage is available
  let storageAvailable;

  try {
    var storage = window["localStorage"],
      x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    storageAvailable = true;
  } catch (e) {
    storageAvailable = false;
  }

  const getTimeStamp = () => {
    const date = new Date();
    return date.getTime()
  };
  
  const getTimeLeft = () => { 
    let time;
  
    if (storageAvailable === true) {
      time = timeLimitMS - (localStorage.getItem("visited") ? getTimeStamp() - parseInt(JSON.parse(localStorage.getItem("visited"))) : 0);
  
    } else if (storageAvailable === false) {
      time = (timeLimitMS / 2) - (getTimeStamp() - timeStamp);
      
    }
    return time
  }
  
  const convertTimeLeft = (time) => {

    daysLeft = time >= msDay ? Math.floor(time / msDay) : 0;
    time -= daysLeft > 0 ? (daysLeft * msDay) : 0;
    hoursLeft = time > msHour ? Math.floor(time / msHour) : 0;
    time -= hoursLeft > 0 ? (hoursLeft * msHour) : 0;
    minutesLeft = time > msMinute ? Math.floor(time / msMinute) : 0;
    time -= minutesLeft > 0 ? (minutesLeft * msMinute) : 0;
    secondsLeft = time > msSecond ? Math.floor(time / msSecond) : 0;
    time -= secondsLeft > 0 ? (secondsLeft * msSecond) : 0;
  }
  
  const displayTimeLeft = (days, hours, minutes, seconds) => { 
    const countdownCont = timerWrapper.children[1];
    const dayCont = countdownCont.children[0]
    const hourCont = countdownCont.children[1]
    const minuteCont = countdownCont.children[2]
    const secondCont = countdownCont.children[3]
    
    dayCont.children[1].textContent = days
    hourCont.children[1].textContent = hours
    minuteCont.children[1].textContent = minutes
    secondCont.children[1].textContent = seconds
  }
  
  const displayTimer = () => { 

    setInterval(() => {
      convertTimeLeft(getTimeLeft())
      displayTimeLeft(daysLeft, hoursLeft, minutesLeft, secondsLeft)
    }, 1000);
  
    if (timerWrapper.classList.contains("hidden")) { timerWrapper.classList.remove("hidden") }
  
  };

    // Set time
  if (storageAvailable === true) {
    if (!localStorage.getItem("visited")) {
      localStorage.setItem("visited", JSON.stringify(getTimeStamp()));

    } else if (localStorage.getItem("visited") && (getTimeLeft() < 0)) {
      localStorage.setItem("visited", JSON.stringify(getTimeStamp()));
    }

  } else if (storageAvailable === false) { 
    timeStamp = getTimeStamp();
  }

  displayTimer()

}