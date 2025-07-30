const declineBtn = document.getElementById("decline-button");
const countdownCont = document.getElementsByClassName("countdown-container")[0];
const homePage = "../index.html"
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
var youTubePlayer;
const playBtn = document.getElementById("play-button");

const getTimeStamp = () => {
  const date = new Date();
  return date.getTime()
};

const getTimeLeft = () => { 
  let time = timeLimitMS - (localStorage.getItem("visited") ? getTimeStamp() - parseInt(JSON.parse(localStorage.getItem("visited"))) : 0);
  return time
}

const convertTimeLeft = () => { 
  let time = getTimeLeft()

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

  //redirects to home page if not interested
declineBtn.addEventListener("click", () => { 
  window.location.replace(homePage);
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
      }
    })
  }
  
  const onPlayerReady = (e) => { 
    e.target.playVideo()
  }

})

window.onload = () => { 
  if (!localStorage.getItem("visited")) {
    localStorage.setItem("visited", JSON.stringify(getTimeStamp()))

  } else if (localStorage.getItem("visited") && (getTimeLeft() > 0)) {
    setInterval(() => {
      convertTimeLeft()
      displayTimeLeft(daysLeft, hoursLeft, minutesLeft, secondsLeft)
    }, 1000);

  } else {
    window.location.replace(homePage);  }
}

