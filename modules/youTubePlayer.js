export default function (container, ctaBtn, id) {
  let player;

    //play youtube video on clicking placeholder
  container.addEventListener("click", () => { 

    const newScript = document.createElement("script"); 
    newScript.src = "https://www.youtube.com/player_api";
  
    const lastScript = document.getElementsByTagName("script")[document.getElementsByTagName("script").length - 1]
    lastScript.parentNode.insertBefore(newScript, lastScript);

    window.onYouTubeIframeAPIReady = () => { 
      createPlayer();
    }
    
    const createPlayer = () => {
      const replacedElement = document.getElementById("youTubePlayer");
      const parentWidth = replacedElement.parentNode.offsetWidth;
      const parentHeight = replacedElement.parentNode.offsetHeight;
  
      player = new YT.Player('youTubePlayer', {
        height: `${parentHeight}`, 
        width: `${parentWidth}`,
        videoId: id,
        playerVars: {
          'playsinline': 1,
          'rel': '0'
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
        showCTAButton();
        player.loadVideoById(id);
        player.stopVideo();
  
      }
    }
  
  })

  const showCTAButton = () => { 
    ctaBtn.classList.contains("invisible") && ctaBtn.classList.remove("invisible");
    ctaBtn.href = "#cta-section";
  }
    
}