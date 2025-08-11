import post from ".././modules/formHandler.js";
const leadForm = document.querySelector('#vsl-lead-form');

const timerWrapper = document.getElementsByClassName("timer-wrapper")[0];
const countdownCont = document.getElementsByClassName("countdown-container")[0];
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
var youTubePlayer;
const playBtn = document.getElementById("play-button");
let storageAvailable;
const vslSection = document.getElementById("vsl-section");
const ctaBtn = vslSection.querySelectorAll("a")[0]

const getStorageAvailable = (storageType) => { 
  try {
    var storage = window[storageType],
      x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
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

  timerWrapper.classList.contains("hidden") && timerWrapper.classList.remove("hidden");

};

const showCTAButton = () => { 
  ctaBtn.classList.contains("invisible") && ctaBtn.classList.remove("invisible");
  ctaBtn.href = "#cta-section";
}

leadForm.addEventListener("submit", (e) => { 
  e.preventDefault();
  document.querySelector("#time-input").value = (new Date());
  document.querySelector('#device-width-input').value = screen.width;
  document.querySelector('#device-height-input').value = screen.height;
  document.querySelector('#window-width-input').value = window.innerWidth;
  document.querySelector('#window-height-input').value = window.innerHeight;
  document.querySelector('#platform-input').value = navigator.userAgentData.platform;
  document.querySelector('#isMobile-input').value = navigator.userAgentData.mobile;
  const formData = new FormData(e.target);
  const dataObj = {}
  for (const [key, value] of formData) {
    dataObj[key] = (value);
  }
  dataObj['form_name'] = leadForm.id.replaceAll('-', "_");

  post(dataObj);

})

vslSection.addEventListener("click", () => { 
  playBtn.click();
})

  //play youtube video on clicking placeholder
playBtn.addEventListener("click", () => { 

  //add script
  const newScript = document.createElement("script");
  newScript.src = "https://www.youtube.com/player_api";

  const lastScript = document.getElementsByTagName("script")[document.getElementsByTagName("script").length - 1]
  lastScript.parentNode.insertBefore(newScript, lastScript);

  const replacedElement = document.getElementById("youTubePlayer");
  const parentWidth = replacedElement.parentNode.offsetWidth;
  const parentHeight = replacedElement.parentNode.offsetHeight;
  const vSLYouTubeId = "lMkxVPOK1Pc";

  window.onYouTubeIframeAPIReady = () =>{ 

    youTubePlayer = new YT.Player('youTubePlayer', {
      height: `${parentHeight}`, 
      width: `${parentWidth}`,
      videoId: vSLYouTubeId,
      playerVars: {
        'playsinline': 1
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onStateChange,
      }
    })
  }
  
  const onPlayerReady = (e) => { 
    e.target.playVideo()
  }

  const onStateChange = (event) => { 
    if (event.data === YT.PlayerState.ENDED) { 
      showCTAButton()
    }
  }

})

window.onload = () => { 
  storageAvailable = getStorageAvailable("localStorage");
  
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