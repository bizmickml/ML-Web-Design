export default function(navEl, mobileNavEl, mobileNavIcon, mobile) {
  
  // #nav vs. #mobile-nav-btn visibility
  if (!mobile) {
    !mobileNavIcon.classList.contains("hidden") && mobileNavIcon.classList.add("hidden");
    navEl.classList.contains("hidden") && navEl.classList.remove("hidden");

  } else if (mobile) {
    mobileNavIcon.classList.contains("hidden") && mobileNavIcon.classList.remove("hidden");
    !navEl.classList.contains("hidden") && navEl.classList.add("hidden");

    mobileNavIcon.addEventListener("click", () => {
      
      mobileNavEl.classList.remove("hidden");
      mobileNavIcon.classList.add("invisible");

      [...mobileNavEl.children[0].children].forEach((el) => {
        el.addEventListener("click", () => {
          mobileNavEl.classList.add("hidden");
          mobileNavIcon.classList.remove("invisible");
        })
      })
    })
  } 
}