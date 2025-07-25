const countdownCont = document.getElementById("countdown-container");

const getTimeStamp = () => {
  const date = new Date();
  return date.getTime()
};

const getElapsedTime = () => { 
  const timeStamp = getTimeStamp();
  const elapsed = localStorage.getItem("visited") ? timeStamp - parseInt(JSON.parse(localStorage.getItem("visited"))) : 0;
  const elapsedDays = Math.floor(elapsed / (1000 * 60 * 60 * 24))
  const elapsedHours = elapsedDays > 0 ? Math.floor(((elapsedDays * (1000 * 60 * 60 * 24)) - elapsed) / (1000 * 60 * 60)) : Math.floor(elapsed / (1000 * 60 * 60))
  const elapsedMinutes = elapsedHours > 0 ? Math.floor(((elapsedHours * (1000 * 60 * 60)) - elapsed) / (1000 * 60)) : Math.floor(elapsed / (1000 * 60))
  const elapsedSeconds = elapsedMinutes > 0 ? Math.floor(((elapsedMinutes * (1000 * 60)) - elapsed) / 1000) : Math.floor(elapsed / 1000)
  console.log(elapsed, elapsedDays, elapsedHours, elapsedMinutes, elapsedSeconds)
}
getElapsedTime()

const hasVisited = () => { 
  if (localStorage.getItem("hasVisited")) {
    return true;
  } else {
    return false;
  }
}

window.onload = () => { 
  if (!hasVisited()) {
    localStorage.setItem("visited", JSON.stringify(getTimeStamp()))
  } else if (hasVisited()) {
    console.log(JSON.parse(localStorage.getItem("visited")))
  }
}