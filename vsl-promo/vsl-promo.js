import leadForm from "../modules/leadForm.js"; 
import countdownTimer from '../modules/countdownTimer.js';
import youTubePlayer from ".././modules/youTubePlayer.js";

window.onload = () => { 
  countdownTimer(document.querySelector(".timer-wrapper"));
  leadForm(document.querySelector('.cta-container'), "./schedule-page");
  youTubePlayer(document.querySelector('.video-container'), document.getElementById("vsl-section").querySelectorAll("a")[0], "lMkxVPOK1Pc")
}