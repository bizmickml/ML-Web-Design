import preferredFontSize from "./responsiveFontSize.js";
import navControl from "./responsiveNav.js";

/** ---- For Module Parameters ---- */
const minFontSize = 10;
const maxFontSize = 25;
const maxScreenWidth = 1800;
const minScreenWidth = 320;
const mobileScreenWidthThreshold = 1000;

/** ---- Page Elements ---- */
const navEl = document.getElementById("nav");
const mobileNavEl = document.getElementById("mobile-nav");
const mobileNavIcon = document.getElementById("mobile-menu-icon");
const whyUsSection = document.getElementById("why-us");
const whyUsTextWraps = [...whyUsSection.getElementsByClassName("text-wrap")];
const aboutHeadWrap = document.getElementById("about-head-wrap");
const aboutHeadTitle = document.getElementById("about-title");
const keyPoints = [document.getElementById("key-point-1"), document.getElementById("key-point-2"), document.getElementById("key-point-3")];

function isMobile() {
  if (window.innerWidth < mobileScreenWidthThreshold) {
    return true 
  } else {
    return false
  }
}

function setFontSize() {
  document.querySelector(":root").setAttribute("style", `font-size: ${preferredFontSize(minFontSize, maxFontSize, minScreenWidth, maxScreenWidth)};`)
}

function whyUsLayout() {

  if (isMobile()) {
    whyUsTextWraps.forEach((el) => {
      if (el.parentNode.id.includes("2")) {
        el.classList.remove("right-align");
        el.parentNode.style.flexDirection = "row-reverse";
        el.parentNode.style.flexWrap = "wrap-reverse"

      } else if (!el.parentNode.id.includes("2")) {
        el.parentNode.style.flexWrap = "wrap";
      }
    })

  } else if (!isMobile()) {
    whyUsTextWraps.forEach((el) => {
      if (el.parentNode.id.includes("2")) {
        el.classList.add("right-align");
        el.parentNode.style.flexDirection = "row";
        el.parentNode.style.flexWrap = "nowrap";

      } else if (!el.parentNode.id.includes("2")) {
        el.parentNode.style.flexWrap = "nowrap";
      }
    })
  }
}

function aboutHeadLayout() {
  if (isMobile()) {
    aboutHeadWrap.style.flexWrap = "wrap-reverse";
    aboutHeadTitle.style.flex = "0 0 100%";
    aboutHeadTitle.style.textAlign = "center";
  } else {
    aboutHeadWrap.style.flexWrap = "nowrap";
    aboutHeadTitle.style.flex = "0 0 69%";
    aboutHeadTitle.style.textAlign = "left";
  }
}

function animateKeyPoints() {
  const windowHeight = window.innerHeight

  keyPoints.forEach((el) => {
    const elTop = el.getBoundingClientRect().y;
    const elBot = el.getBoundingClientRect().bottom;

    if (elTop > 0 && elTop < (windowHeight * .50)) {
      !el.classList.contains("animate") && el.classList.add("animate")

    } else if (elBot < 0 || elTop > windowHeight) {
      el.classList.contains("animate") && el.classList.remove("animate")
    }
  })

}

window.onload = () => {
  setFontSize();
  aboutHeadLayout();
  navControl(navEl, mobileNavEl, mobileNavIcon, isMobile())
  whyUsLayout();
}

window.addEventListener("resize", () => {
  aboutHeadLayout();
  navControl(navEl, mobileNavEl, mobileNavIcon, isMobile())
  whyUsLayout();
});

window.addEventListener("scroll", () => {
  animateKeyPoints();
})

// Copyright (c) 2025 by Michael Lamondy