import preferredFontSize from "./modules/responsiveFontSize.js";
import navControl from "./modules/responsiveNav.js";
import elWidthControl from "./modules/responsiveWidths.js";
import padControl from "./modules/responsivePadding.js";


/** ---- For Module Parameters ---- */
const minFontSize = 10;
const fontSizeMultiplier = 2.6;
const maxFontSize = minFontSize * fontSizeMultiplier;
const maxScreenWidth = 2560;
const minScreenWidth = 320;

  /** ---- section #why-us ---- */
const whyUsMinPadding = 10;
const whyUsMaxWidth = 1900;
const whyUsMaxPadding = (2560 - whyUsMaxWidth) / 2;
const whyUsImgMinWidth = 100;
const whyUsImgMaxWidth = whyUsMaxWidth * .20;
const whyUsTxtMinWidth = 285;
const whyUsTxtMaxWidth = whyUsMaxWidth * .7;
const pricingMinPadding = whyUsMinPadding;
const pricingMaxPadding = (2560 - 2200) / 2;


/** ---- Page Elements ---- */
const nav = document.getElementById("nav");
const mobileNav = document.getElementById("mobile-nav");
const mobileNavIcon = document.getElementById("mobile-menu-icon");
const whyUsSection = document.getElementById("why-us");
const whyUsImgs = [...whyUsSection.querySelectorAll("img")];
const whyUsTextWraps = [...whyUsSection.getElementsByClassName("text-wrap")];
const pricingContainer = document.getElementById("pricing");
const aboutHeadWrap = document.getElementById("about-head-wrap");
const aboutHeadTitle = document.getElementById("about-title");
const keyPoints = [document.getElementById("key-point-1"), document.getElementById("key-point-2"), document.getElementById("key-point-3")];



function pageLayout() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const screenRes = screenWidth / screenHeight;

  whyUsTextWraps.forEach((el) => {

    if (screenRes < 1 && el.parentNode.id.includes("2")) {
      el.classList.remove("right-align");
      el.parentNode.style.flexDirection = "row-reverse";
      el.parentNode.style.flexWrap = "wrap-reverse"

    } else if (screenRes < 1 && !el.parentNode.id.includes("2")) {
      el.parentNode.style.flexWrap = "wrap";

    } else if (screenRes >= 1 && !el.parentNode.id.includes("2")) {
      el.parentNode.style.flexWrap = "nowrap";

    } else if (screenRes >= 1 && el.parentNode.id.includes("2")) {
      el.classList.add("right-align");
      el.parentNode.style.flexDirection = "row";
      el.parentNode.style.flexWrap = "nowrap";
    } 
  })

  if (screenRes < 1) {
    aboutHeadWrap.style.flexWrap = "wrap-reverse";
    aboutHeadTitle.style.flex = "0 0 100%";
    aboutHeadTitle.style.textAlign = "center";

  } else if (screenRes >= 1) {
    aboutHeadWrap.style.flexWrap = "nowrap";
    aboutHeadTitle.style.flex = "0 0 69%";
    aboutHeadTitle.style.textAlign = "left";
  }

}

window.onload = () => {
  document.querySelector(":root").setAttribute("style", `font-size: ${preferredFontSize(minFontSize, maxFontSize, minScreenWidth, maxScreenWidth)};`)
  navControl(nav, mobileNav, mobileNavIcon);
  padControl(whyUsSection, whyUsMinPadding, whyUsMaxPadding);
  padControl(pricingContainer, pricingMinPadding, pricingMaxPadding);

  whyUsImgs.forEach((el) => {
    elWidthControl(el, whyUsImgMinWidth, whyUsImgMaxWidth, minScreenWidth, maxScreenWidth);
  })

  whyUsTextWraps.forEach((el) => {
    elWidthControl(el, whyUsTxtMinWidth, whyUsTxtMaxWidth, minScreenWidth, maxScreenWidth);
  })
  pageLayout();

}

window.addEventListener("resize", () => {
  navControl(nav, mobileNav, mobileNavIcon);
  padControl(whyUsSection, whyUsMinPadding, whyUsMaxPadding);
  pageLayout();
});

window.addEventListener("scroll", () => {
  const windowHeight = window.innerHeight

  keyPoints.forEach((el) => {
    const elTop = el.getBoundingClientRect().y;
    const elBot = el.getBoundingClientRect().bottom;

    if (elTop > 0 && elTop < (windowHeight * .66)) {
      el.classList.add("animate")

    } else if (elBot < 0 || elTop > windowHeight) {
      el.classList.contains("animate") && el.classList.remove("animate")
    }
  })

})