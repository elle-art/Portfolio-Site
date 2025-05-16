var images = new Array();
function preload() {
  for (i = 0; i < preload.arguments.length; i++) {
    images[i] = new Image();
    images[i].src = preload.arguments[i];
  }
}
preload();

// Hover-Carousel component
// By Yair Even-Or
// written in jQuery 2013 -> refactored to vanilla 2020
// https://github.com/yairEO/hover-carousel

function HoverCarousel(elm, settings) {
  this.DOM = {
    scope: elm,
    wrap: elm.querySelector("ul").parentNode,
  };

  this.containerWidth = 0;
  this.scrollWidth = 0;
  this.posFromLeft = 0; // Stripe position from the left of the screen
  this.stripePos = 0; // When relative mouse position inside the thumbs stripe
  this.animated = null;
  this.callbacks = {};

  this.init();
}

HoverCarousel.prototype = {
  init() {
    this.bind();
  },

  destroy() {
    this.DOM.scope.removeEventListener(
      "mouseenter",
      this.callbacks.onMouseEnter
    );
    this.DOM.scope.removeEventListener("mousemove", this.callbacks.onMouseMove);
  },

  bind() {
    this.callbacks.onMouseEnter = this.onMouseEnter.bind(this);
    this.callbacks.onMouseMove = (e) => {
      if (this.mouseMoveRAF) cancelAnimationFrame(this.mouseMoveRAF);

      this.mouseMoveRAF = requestAnimationFrame(this.onMouseMove.bind(this, e));
    };

    this.DOM.scope.addEventListener("mouseenter", this.callbacks.onMouseEnter);
    this.DOM.scope.addEventListener("mousemove", this.callbacks.onMouseMove);
  },

  // calculate the thumbs container width
  onMouseEnter(e) {
    this.nextMore = this.prevMore = false; // reset

    this.containerWidth = this.DOM.wrap.clientWidth;
    this.scrollWidth = this.DOM.wrap.scrollWidth;
    // padding in percentage of the area which the mouse movement affects
    this.padding = 0.2 * this.containerWidth;
    this.posFromLeft = this.DOM.wrap.getBoundingClientRect().left;
    var stripePos = e.pageX - this.padding - this.posFromLeft;
    this.pos = stripePos / (this.containerWidth - this.padding * 2);
    this.scrollPos = (this.scrollWidth - this.containerWidth) * this.pos;

    // temporary add smoothness to the scroll
    this.DOM.wrap.style.scrollBehavior = "smooth";

    if (this.scrollPos < 0) this.scrollPos = 0;

    if (this.scrollPos > this.scrollWidth - this.containerWidth)
      this.scrollPos = this.scrollWidth - this.containerWidth;

    this.DOM.wrap.scrollLeft = this.scrollPos;
    this.DOM.scope.style.setProperty(
      "--scrollWidth",
      (this.containerWidth / this.scrollWidth) * 100 + "%"
    );
    this.DOM.scope.style.setProperty(
      "--scrollLleft",
      (this.scrollPos / this.scrollWidth) * 100 + "%"
    );

    // lock UI until mouse-enter scroll is finihsed, after aprox 200ms
    clearTimeout(this.animated);
    this.animated = setTimeout(() => {
      this.animated = null;
      this.DOM.wrap.style.scrollBehavior = "auto";
    }, 200);

    return this;
  },

  // move the stripe left or right according to mouse position
  onMouseMove(e) {
    // don't move anything until inital movement on 'mouseenter' has finished
    if (this.animated) return;

    this.ratio = this.scrollWidth / this.containerWidth;

    // the mouse X position, "normalized" to the carousel position
    var stripePos = e.pageX - this.padding - this.posFromLeft;

    if (stripePos < 0) stripePos = 0;

    // calculated position between 0 to 1
    this.pos = stripePos / (this.containerWidth - this.padding * 2);

    // calculate the percentage of the mouse position within the carousel
    this.scrollPos = (this.scrollWidth - this.containerWidth) * this.pos;

    this.DOM.wrap.scrollLeft = this.scrollPos;

    // update scrollbar
    if (this.scrollPos < this.scrollWidth - this.containerWidth)
      this.DOM.scope.style.setProperty(
        "--scrollLleft",
        (this.scrollPos / this.scrollWidth) * 100 + "%"
      );

    // check if element has reached an edge
    this.prevMore = this.DOM.wrap.scrollLeft > 0;
    this.nextMore =
      this.scrollWidth - this.containerWidth - this.DOM.wrap.scrollLeft > 5;

    this.DOM.scope.setAttribute(
      "data-at",
      (this.prevMore ? "left " : " ") + (this.nextMore ? "right" : "")
    );
  },
};

var carouselElm = document.querySelector(".carousel");
new HoverCarousel(carouselElm);

var DEBUG = false;
function toggleClass() {
  // Cache the hidden menu, toggle the class
  var hiddenMenu = document.querySelector(".hiddenMenu");
  var darkFade = document.getElementById("darkFade");

  hiddenMenu.classList.toggle("hidden");
  darkFade.classList.toggle("fade");

  // See if this thing is working!
  if (DEBUG) {
    alert("test");
  }
}

var button = document.getElementById("spark");
button.addEventListener("click", toggleClass);

function setBtn(btn) {
  document.getElementById(btn).style.backgroundColor = "#625c51";

  if (btn == "btnA") {
    document.getElementById("btn1").style.backgroundColor = "#867d6e";
    document.getElementById("btn2").style.backgroundColor = "#867d6e";
    document.getElementById("btn3").style.backgroundColor = "#867d6e";
    document.getElementById("btn4").style.backgroundColor = "#867d6e";
    document.getElementById("btnB").style.backgroundColor = "#867d6e";
    setParagraphs("btnA");
  }
  if (btn == "btnB") {
    document.getElementById("btn1").style.backgroundColor = "#867d6e";
    document.getElementById("btn2").style.backgroundColor = "#867d6e";
    document.getElementById("btn3").style.backgroundColor = "#867d6e";
    document.getElementById("btn4").style.backgroundColor = "#867d6e";
    document.getElementById("btnA").style.backgroundColor = "#867d6e";
    setParagraphs("btnB");
  }
  if (btn == "btn1") {
    document.getElementById("btn2").style.backgroundColor = "#867d6e";
    document.getElementById("btn3").style.backgroundColor = "#867d6e";
    document.getElementById("btn4").style.backgroundColor = "#867d6e";
    document.getElementById("btnA").style.backgroundColor = "#867d6e";
    document.getElementById("btnB").style.backgroundColor = "#867d6e";
    setParagraphs("btn1");
  }
  if (btn == "btn2") {
    document.getElementById("btn1").style.backgroundColor = "#867d6e";
    document.getElementById("btn3").style.backgroundColor = "#867d6e";
    document.getElementById("btn4").style.backgroundColor = "#867d6e";
    document.getElementById("btnA").style.backgroundColor = "#867d6e";
    document.getElementById("btnB").style.backgroundColor = "#867d6e";
    setParagraphs("btn2");
  }
  if (btn == "btn3") {
    document.getElementById("btn2").style.backgroundColor = "#867d6e";
    document.getElementById("btn1").style.backgroundColor = "#867d6e";
    document.getElementById("btn4").style.backgroundColor = "#867d6e";
    document.getElementById("btnA").style.backgroundColor = "#867d6e";
    document.getElementById("btnB").style.backgroundColor = "#867d6e";
    setParagraphs("btn3");
  }
  if (btn == "btn4") {
    document.getElementById("btn2").style.backgroundColor = "#867d6e";
    document.getElementById("btn1").style.backgroundColor = "#867d6e";
    document.getElementById("btn3").style.backgroundColor = "#867d6e";
    document.getElementById("btnA").style.backgroundColor = "#867d6e";
    document.getElementById("btnB").style.backgroundColor = "#867d6e";
    setParagraphs("btn4");
  }

  if (btn == "dot1") {
    document.getElementById("dot2").style.backgroundColor = "#867d6e";
    document.getElementById("dot3").style.backgroundColor = "#867d6e";
    document.getElementById("dot4").style.backgroundColor = "#867d6e";
  }
  if (btn == "dot2") {
    document.getElementById("dot1").style.backgroundColor = "#867d6e";
    document.getElementById("dot3").style.backgroundColor = "#867d6e";
    document.getElementById("dot4").style.backgroundColor = "#867d6e";
  }
  if (btn == "dot3") {
    document.getElementById("dot2").style.backgroundColor = "#867d6e";
    document.getElementById("dot1").style.backgroundColor = "#867d6e";
    document.getElementById("dot4").style.backgroundColor = "#867d6e";
  }
  if (btn == "dot4") {
    document.getElementById("dot2").style.backgroundColor = "#867d6e";
    document.getElementById("dot3").style.backgroundColor = "#867d6e";
    document.getElementById("dot1").style.backgroundColor = "#867d6e";
  }
}

function hideCodeElements(frame) {
  document.getElementById(frame).style.opacity = "0";
  document.getElementById(frame).style.zIndex = "-2";

  if (frame == "bloom" || frame == "wrapBloom") {
    document.getElementById("wrapBloom").style.opacity = "0";
    document.getElementById("bloom").style.opacity = "0";
    document.getElementById("wrapBloom").style.zIndex = "-2";
  }
}

function setCodeFrame(frame) {
  if (document.getElementById(frame).id == frame) {
    document.getElementById(frame).style.opacity = "1";
    document.getElementById(frame).style.zIndex = "2";
  }

  if (frame == "bloom" || frame == "wrapBloom") {
    document.getElementById("wrapBloom").style.opacity = "1";
    document.getElementById("bloom").style.opacity = "1";
    document.getElementById("wrapBloom").style.zIndex = "1";
  }
}

function setParagraphs(btn) {
  let link = document.querySelector("#code_link a");
  // Remove any existing button container
  const existingBtnContainer = document.getElementById("cas-collab-btns");
  if (existingBtnContainer) {
    existingBtnContainer.remove();
  }

  if (btn == "btnA") {
    document.getElementById("code_h3").innerText = "Greetings 101";
    document.getElementById("code_h5").innerText = "(Play the demo video)";
    document.getElementById("code_p").innerText =
      "Greetings 101 is a web-based application designed to help users learn and practice greetings in various languages. Click the link below to explore this project in more detail.";
    link.href = "about.html#current";
  }

  if (btn == "btnB") {
    document.getElementById("code_h3").innerText = "CAS Collaboration System";
    document.getElementById("code_h5").innerText = "(View page in browser)";
    document.getElementById("code_p").innerText =
      "I had the privilege of redesigning the College of Arts and Sciences Collaboration System at ISU. This web-based application is facilitates collaboration among students, faculty, and staff, allowing users to search for professors and explore their research interests. I also designed the Syllabi Database for CAS, which can be viewed through the button below. ";

    link.href = "https://casit.illinoisstate.edu/collaboration-dev";

    // Add buttons for viewing an image and a web page
    const btnContainer = document.createElement("div");
    btnContainer.id = "cas-collab-btns";
    btnContainer.style.marginTop = "10px";

    // Image button
    const imgBtn = document.createElement("button");
    imgBtn.innerText = "View Previous Design";
    imgBtn.onclick = function () {
      window.open("gallery_imgs/code/Previous_Col_Sys.png", "_blank");
    };
    btnContainer.appendChild(imgBtn);

    // Web page button
    const syllabiBtn = document.createElement("button");
    syllabiBtn.innerText = "Open CAS Syllabi Database Page";
    syllabiBtn.style.marginLeft = "8px";
    syllabiBtn.onclick = function () {
      window.open("https://casit.illinoisstate.edu/syllabi", "_blank");
    };
    btnContainer.appendChild(syllabiBtn);

    // Insert the buttons after the paragraph
    const codeP = document.getElementById("code_p");
    codeP.parentNode.insertBefore(btnContainer, codeP.nextSibling);
  }
  if (btn == "btn1") {
    document.getElementById("code_h3").innerText = "ClassStar";
    document.getElementById("code_h5").innerText = "(Interact with the app)";
    document.getElementById("code_p").innerText =
      "A friend of mine mentioned that as a peer mentor, they have to keep track of their student's behaviors. They asked me if that was something I could code. This code allows a user to create a roster of students and a list of behaviors. There's a discrete button mode for moving around the classroom and importing/exporting of excel files to keep track of data over time";
    link.href = "https://elle-art.github.io/ClassStar/";
  }
  if (btn == "btn2") {
    document.getElementById("code_h3").innerText = "Mp1: Caliente";
    document.getElementById("code_h5").innerText = "(Click to animate)";
    document.getElementById("code_p").innerText =
      "This is Cali...she's a bit of a hot head. No images, just several lines of code create the character, Cali, and the destruction she leaves in her wake. Every detail is meticulously crafted using JavaScript code.";
    link.href = "https://elle-art.github.io/CTK302/Unit1/mp1/index.html";
  }
  if (btn == "btn3") {
    document.getElementById("code_h3").innerText = "Mp3: Bloom";
    document.getElementById("code_h5").innerText =
      "(Use left and right arrow keys to move)";
    document.getElementById("code_p").innerText =
      "Bloom into a JavaScript gaming experience! Collect water droplets to grow the flower atop your character's head. Hand-drawn assets, each drawn with Sharpie on notebook paper, add an authentic charm, creating a uniquely personalized aesthetic.";
    link.href = "https://elle-art.github.io/CTK302/Unit3/mp3/index.html";
  }
  if (btn == "btn4") {
    document.getElementById("code_h3").innerText = "CSS Animation: Trains";
    document.getElementById("code_h5").innerText = "(Scroll and hover)";
    document.getElementById("code_p").innerText =
      "Explore the benefits of public transportation though CSS animations! The GIFs, sourced from the web, influenced the vibrant and futuristic color scheme. Notable features include a hover-triggered animated pie chart that represents key data and a timed animation at the bottom, all to promote public transportation through an aesthetically pleasing and interactive lens.";
    link.href =
      "https://elle-art.github.io/CTK303/Assignment2/CSSanimation.html";
  }

  if (btn == "dot1") {
    document.getElementById("design_h3").innerText = "Bonfire";
    document.getElementById("design_h4").innerText =
      "Interactive App Mockup - Honors Contract";
    document.getElementById("designP").innerText =
      "Join the Bonfire! This app unifies communities by highlighting local businesses offering free and low-cost resources. Through Adobe XD, you can interact with this mockup as if the app was downloaded on your phone. Explore it for yourself! ";
  }
  if (btn == "dot2") {
    document.getElementById("design_h3").innerText = "Plantfolio";
    document.getElementById("design_h4").innerText =
      "Landing Page - Composition and Design";
    document.getElementById("designP").innerText =
      "Learn all about plants with Plantfolio, a plant encyclopedia! This captivating landing page, designed in Adobe InDesign, offers a glimpse into a user-friendly and visually appealing platform for exploring the wondrous world of plants.";
  }
  if (btn == "dot3") {
    document.getElementById("design_h3").innerText = "Welcome Week 2023";
    document.getElementById("design_h4").innerText =
      "Facebook Banner - Social Media";
    document.getElementById("designP").innerText =
      "This Facebook banner was designed for ISU Welcome Week 2023. Designed to capture the essence of campus life, it serves as a visual gateway to a week filled with excitement, collaboration, and the spirit of ISU, setting the tone for a great start to a new school year!";
  }
  if (btn == "dot4") {
    document.getElementById("design_h3").innerText = "Recruitment Postcards";
    document.getElementById("design_h4").innerText = "Postcards - Social Media";
    document.getElementById("designP").innerText =
      " As part of my job with the School of IT at ISU, I designed mockups for recruitment postcards. These visual representations not only show the proud achievements of the School of IT but also serve as compelling invitations to prospective students.";
  }
}

function setImages(btn) {
  let image = document.querySelector("#design_img");
  let link = document.querySelector("#bonfire_link");
  if (btn == "dot2" || "dot3" || "dot4") {
    document.getElementById("bonfire_video").style.opacity = "0";
    document.getElementById("bonfire_video").style.zIndex = "-2";
  }
  if (btn == "dot1") {
    image.setAttribute("src", "gallery_imgs/design/bonfire_frame.png");
    link.innerHTML = "Open in browser";
    document.getElementById("bonfire_video").style.opacity = "1";
    document.getElementById("bonfire_video").style.zIndex = "1";
  }
  if (btn == "dot2") {
    image.setAttribute("src", "gallery_imgs/design/plantfolio_ frame.png");
    link.innerHTML = " ";
  }
  if (btn == "dot3") {
    image.setAttribute("src", "gallery_imgs/design/banner_frame.png");
    link.innerHTML = " ";
  }
  if (btn == "dot4") {
    image.setAttribute("src", "gallery_imgs/design/postcard_frame.png");
    link.innerHTML = " ";
  }
}

function get(btn) {
  setBtn(btn);
  setParagraphs(btn);
  setImages(btn);
}

function getGreetings() {
  setBtn("btnA");
  hideCodeElements("wrapBloom");
  hideCodeElements("train");
  hideCodeElements("cali");
  hideCodeElements("star");
  hideCodeElements("collab");
  setCodeFrame("greet");
}

var button = document.getElementById("btnA");
button.addEventListener("click", getGreetings);

function getCollab() {
  setBtn("btnB");
  hideCodeElements("wrapBloom");
  hideCodeElements("train");
  hideCodeElements("cali");
  hideCodeElements("star");
  hideCodeElements("greet");
  setCodeFrame("collab");
}

var button = document.getElementById("btnB");
button.addEventListener("click", getCollab);

function getTracker() {
  setBtn("btn1");
  hideCodeElements("wrapBloom");
  hideCodeElements("train");
  hideCodeElements("cali");
  hideCodeElements("greet");
  hideCodeElements("collab");
  setCodeFrame("star");
}

var button = document.getElementById("btn1");
button.addEventListener("click", getTracker);

function getCali() {
  setBtn("btn2");
  hideCodeElements("wrapBloom");
  hideCodeElements("train");
  hideCodeElements("star");
  hideCodeElements("greet");
  hideCodeElements("collab");
  setCodeFrame("cali");
}

var button = document.getElementById("btn2");
button.addEventListener("click", getCali);

function getBloom() {
  setBtn("btn3");
  hideCodeElements("star");
  hideCodeElements("cali");
  hideCodeElements("train");
  hideCodeElements("greet");
  hideCodeElements("collab");
  setCodeFrame("bloom");
}

var button = document.getElementById("btn3");
button.addEventListener("click", getBloom);

function getTrains() {
  setBtn("btn4");
  hideCodeElements("star");
  hideCodeElements("cali");
  hideCodeElements("bloom");
  hideCodeElements("greet");
  hideCodeElements("collab");
  setCodeFrame("train");
}

var button = document.getElementById("btn4");
button.addEventListener("click", getTrains);

document.addEventListener("DOMContentLoaded", function () {
  const hiddenMenu = document.querySelector(".hiddenMenu");

  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;

    // Adjust the position of the div based on the scroll position
    hiddenMenu.style.transform = `translateY(${scrollY}px)`;
  });
});

var images = new Array();
function preload() {
  for (i = 0; i < preload.arguments.length; i++) {
    images[i] = new Image();
    images[i].src = preload.arguments[i];
  }
}
preload();

// Hover-Carousel component
// By Yair Even-Or
// written in jQuery 2013 -> refactored to vanilla 2020
// https://github.com/yairEO/hover-carousel

function HoverCarousel(elm, settings) {
  this.DOM = {
    scope: elm,
    wrap: elm.querySelector("ul").parentNode,
  };

  this.containerWidth = 0;
  this.scrollWidth = 0;
  this.posFromLeft = 0; // Stripe position from the left of the screen
  this.stripePos = 0; // When relative mouse position inside the thumbs stripe
  this.animated = null;
  this.callbacks = {};

  this.init();
}

HoverCarousel.prototype = {
  init() {
    this.bind();
  },

  destroy() {
    this.DOM.scope.removeEventListener(
      "mouseenter",
      this.callbacks.onMouseEnter
    );
    this.DOM.scope.removeEventListener("mousemove", this.callbacks.onMouseMove);
  },

  bind() {
    this.callbacks.onMouseEnter = this.onMouseEnter.bind(this);
    this.callbacks.onMouseMove = (e) => {
      if (this.mouseMoveRAF) cancelAnimationFrame(this.mouseMoveRAF);

      this.mouseMoveRAF = requestAnimationFrame(this.onMouseMove.bind(this, e));
    };

    this.DOM.scope.addEventListener("mouseenter", this.callbacks.onMouseEnter);
    this.DOM.scope.addEventListener("mousemove", this.callbacks.onMouseMove);
  },

  // calculate the thumbs container width
  onMouseEnter(e) {
    this.nextMore = this.prevMore = false; // reset

    this.containerWidth = this.DOM.wrap.clientWidth;
    this.scrollWidth = this.DOM.wrap.scrollWidth;
    // padding in percentage of the area which the mouse movement affects
    this.padding = 0.2 * this.containerWidth;
    this.posFromLeft = this.DOM.wrap.getBoundingClientRect().left;
    var stripePos = e.pageX - this.padding - this.posFromLeft;
    this.pos = stripePos / (this.containerWidth - this.padding * 2);
    this.scrollPos = (this.scrollWidth - this.containerWidth) * this.pos;

    // temporary add smoothness to the scroll
    this.DOM.wrap.style.scrollBehavior = "smooth";

    if (this.scrollPos < 0) this.scrollPos = 0;

    if (this.scrollPos > this.scrollWidth - this.containerWidth)
      this.scrollPos = this.scrollWidth - this.containerWidth;

    this.DOM.wrap.scrollLeft = this.scrollPos;
    this.DOM.scope.style.setProperty(
      "--scrollWidth",
      (this.containerWidth / this.scrollWidth) * 100 + "%"
    );
    this.DOM.scope.style.setProperty(
      "--scrollLleft",
      (this.scrollPos / this.scrollWidth) * 100 + "%"
    );

    // lock UI until mouse-enter scroll is finihsed, after aprox 200ms
    clearTimeout(this.animated);
    this.animated = setTimeout(() => {
      this.animated = null;
      this.DOM.wrap.style.scrollBehavior = "auto";
    }, 200);

    return this;
  },

  // move the stripe left or right according to mouse position
  onMouseMove(e) {
    // don't move anything until inital movement on 'mouseenter' has finished
    if (this.animated) return;

    this.ratio = this.scrollWidth / this.containerWidth;

    // the mouse X position, "normalized" to the carousel position
    var stripePos = e.pageX - this.padding - this.posFromLeft;

    if (stripePos < 0) stripePos = 0;

    // calculated position between 0 to 1
    this.pos = stripePos / (this.containerWidth - this.padding * 2);

    // calculate the percentage of the mouse position within the carousel
    this.scrollPos = (this.scrollWidth - this.containerWidth) * this.pos;

    this.DOM.wrap.scrollLeft = this.scrollPos;

    // update scrollbar
    if (this.scrollPos < this.scrollWidth - this.containerWidth)
      this.DOM.scope.style.setProperty(
        "--scrollLleft",
        (this.scrollPos / this.scrollWidth) * 100 + "%"
      );

    // check if element has reached an edge
    this.prevMore = this.DOM.wrap.scrollLeft > 0;
    this.nextMore =
      this.scrollWidth - this.containerWidth - this.DOM.wrap.scrollLeft > 5;

    this.DOM.scope.setAttribute(
      "data-at",
      (this.prevMore ? "left " : " ") + (this.nextMore ? "right" : "")
    );
  },
};

var carouselElm = document.querySelector(".carousel");
new HoverCarousel(carouselElm);

var DEBUG = false;
function toggleClass() {
  // Cache the hidden menu, toggle the class
  var hiddenMenu = document.querySelector(".hiddenMenu");
  var darkFade = document.getElementById("darkFade");

  hiddenMenu.classList.toggle("hidden");
  darkFade.classList.toggle("fade");

  // See if this thing is working!
  if (DEBUG) {
    alert("test");
  }
}

var button = document.getElementById("spark");
button.addEventListener("click", toggleClass);

function setBtn(btn) {
  document.getElementById(btn).style.backgroundColor = "#625c51";

  if (btn == "btnA") {
    document.getElementById("btn1").style.backgroundColor = "#867d6e";
    document.getElementById("btn2").style.backgroundColor = "#867d6e";
    document.getElementById("btn3").style.backgroundColor = "#867d6e";
    document.getElementById("btn4").style.backgroundColor = "#867d6e";
    document.getElementById("btnB").style.backgroundColor = "#867d6e";
    setParagraphs("btnA");
  }
  if (btn == "btnB") {
    document.getElementById("btn1").style.backgroundColor = "#867d6e";
    document.getElementById("btn2").style.backgroundColor = "#867d6e";
    document.getElementById("btn3").style.backgroundColor = "#867d6e";
    document.getElementById("btn4").style.backgroundColor = "#867d6e";
    document.getElementById("btnA").style.backgroundColor = "#867d6e";
    setParagraphs("btnB");
  }
  if (btn == "btn1") {
    document.getElementById("btn2").style.backgroundColor = "#867d6e";
    document.getElementById("btn3").style.backgroundColor = "#867d6e";
    document.getElementById("btn4").style.backgroundColor = "#867d6e";
    document.getElementById("btnA").style.backgroundColor = "#867d6e";
    document.getElementById("btnB").style.backgroundColor = "#867d6e";
    setParagraphs("btn1");
  }
  if (btn == "btn2") {
    document.getElementById("btn1").style.backgroundColor = "#867d6e";
    document.getElementById("btn3").style.backgroundColor = "#867d6e";
    document.getElementById("btn4").style.backgroundColor = "#867d6e";
    document.getElementById("btnA").style.backgroundColor = "#867d6e";
    document.getElementById("btnB").style.backgroundColor = "#867d6e";
    setParagraphs("btn2");
  }
  if (btn == "btn3") {
    document.getElementById("btn2").style.backgroundColor = "#867d6e";
    document.getElementById("btn1").style.backgroundColor = "#867d6e";
    document.getElementById("btn4").style.backgroundColor = "#867d6e";
    document.getElementById("btnA").style.backgroundColor = "#867d6e";
    document.getElementById("btnB").style.backgroundColor = "#867d6e";
    setParagraphs("btn3");
  }
  if (btn == "btn4") {
    document.getElementById("btn2").style.backgroundColor = "#867d6e";
    document.getElementById("btn1").style.backgroundColor = "#867d6e";
    document.getElementById("btn3").style.backgroundColor = "#867d6e";
    document.getElementById("btnA").style.backgroundColor = "#867d6e";
    document.getElementById("btnB").style.backgroundColor = "#867d6e";
    setParagraphs("btn4");
  }

  if (btn == "dot1") {
    document.getElementById("dot2").style.backgroundColor = "#867d6e";
    document.getElementById("dot3").style.backgroundColor = "#867d6e";
    document.getElementById("dot4").style.backgroundColor = "#867d6e";
  }
  if (btn == "dot2") {
    document.getElementById("dot1").style.backgroundColor = "#867d6e";
    document.getElementById("dot3").style.backgroundColor = "#867d6e";
    document.getElementById("dot4").style.backgroundColor = "#867d6e";
  }
  if (btn == "dot3") {
    document.getElementById("dot2").style.backgroundColor = "#867d6e";
    document.getElementById("dot1").style.backgroundColor = "#867d6e";
    document.getElementById("dot4").style.backgroundColor = "#867d6e";
  }
  if (btn == "dot4") {
    document.getElementById("dot2").style.backgroundColor = "#867d6e";
    document.getElementById("dot3").style.backgroundColor = "#867d6e";
    document.getElementById("dot1").style.backgroundColor = "#867d6e";
  }
}

function hideCodeElements(frame) {
  document.getElementById(frame).style.opacity = "0";
  document.getElementById(frame).style.zIndex = "-2";

  if (frame == "bloom" || frame == "wrapBloom") {
    document.getElementById("wrapBloom").style.opacity = "0";
    document.getElementById("bloom").style.opacity = "0";
    document.getElementById("wrapBloom").style.zIndex = "-2";
  }
}

function setCodeFrame(frame) {
  if (document.getElementById(frame).id == frame) {
    document.getElementById(frame).style.opacity = "1";
    document.getElementById(frame).style.zIndex = "2";
  }

  if (frame == "bloom" || frame == "wrapBloom") {
    document.getElementById("wrapBloom").style.opacity = "1";
    document.getElementById("bloom").style.opacity = "1";
    document.getElementById("wrapBloom").style.zIndex = "1";
  }
}

function setParagraphs(btn) {
  let link = document.querySelector("#code_link a");
  // Remove any existing button container
  const existingBtnContainer = document.getElementById("cas-collab-btns");
  if (existingBtnContainer) {
    existingBtnContainer.remove();
  }

  if (btn == "btnA") {
    document.getElementById("code_h3").innerText = "Greetings 101";
    document.getElementById("code_h5").innerText = "(Play the demo video)";
    document.getElementById("code_p").innerText =
      "Greetings 101 is a web-based application designed to help users learn and practice greetings in various languages. Click the link below to explore this project in more detail.";
    link.href = "about.html#current";
  }

  if (btn == "btnB") {
    document.getElementById("code_h3").innerText = "CAS Collaboration System";
    document.getElementById("code_h5").innerText = "(View page in browser)";
    document.getElementById("code_p").innerText =
      "I had the privilege of redesigning the College of Arts and Sciences Collaboration System at ISU. This web-based application is facilitates collaboration among students, faculty, and staff, allowing users to search for professors and explore their research interests. I also designed the Syllabi Database for CAS, which can be viewed through the button below. ";

    link.href = "https://casit.illinoisstate.edu/collaboration-dev";

    // Add buttons for viewing an image and a web page
    const btnContainer = document.createElement("div");
    btnContainer.id = "cas-collab-btns";
    btnContainer.style.marginTop = "10px";

    // Image button
    const imgBtn = document.createElement("button");
    imgBtn.innerText = "View Previous Design";
    imgBtn.onclick = function () {
      window.open("gallery_imgs/code/Previous_Col_Sys.png", "_blank");
    };
    btnContainer.appendChild(imgBtn);

    // Web page button
    const syllabiBtn = document.createElement("button");
    syllabiBtn.innerText = "Open CAS Syllabi Database Page";
    syllabiBtn.style.marginLeft = "8px";
    syllabiBtn.onclick = function () {
      window.open("https://casit.illinoisstate.edu/syllabi", "_blank");
    };
    btnContainer.appendChild(syllabiBtn);

    // Insert the buttons after the paragraph
    const codeP = document.getElementById("code_p");
    codeP.parentNode.insertBefore(btnContainer, codeP.nextSibling);
  }
  if (btn == "btn1") {
    document.getElementById("code_h3").innerText = "ClassStar";
    document.getElementById("code_h5").innerText = "(Interact with the app)";
    document.getElementById("code_p").innerText =
      "A friend of mine mentioned that as a peer mentor, they have to keep track of their student's behaviors. They asked me if that was something I could code. This code allows a user to create a roster of students and a list of behaviors. There's a discrete button mode for moving around the classroom and importing/exporting of excel files to keep track of data over time";
    link.href = "https://elle-art.github.io/ClassStar/";
  }
  if (btn == "btn2") {
    document.getElementById("code_h3").innerText = "Mp1: Caliente";
    document.getElementById("code_h5").innerText = "(Click to animate)";
    document.getElementById("code_p").innerText =
      "This is Cali...she's a bit of a hot head. No images, just several lines of code create the character, Cali, and the destruction she leaves in her wake. Every detail is meticulously crafted using JavaScript code.";
    link.href = "https://elle-art.github.io/CTK302/Unit1/mp1/index.html";
  }
  if (btn == "btn3") {
    document.getElementById("code_h3").innerText = "Mp3: Bloom";
    document.getElementById("code_h5").innerText =
      "(Use left and right arrow keys to move)";
    document.getElementById("code_p").innerText =
      "Bloom into a JavaScript gaming experience! Collect water droplets to grow the flower atop your character's head. Hand-drawn assets, each drawn with Sharpie on notebook paper, add an authentic charm, creating a uniquely personalized aesthetic.";
    link.href = "https://elle-art.github.io/CTK302/Unit3/mp3/index.html";
  }
  if (btn == "btn4") {
    document.getElementById("code_h3").innerText = "CSS Animation: Trains";
    document.getElementById("code_h5").innerText = "(Scroll and hover)";
    document.getElementById("code_p").innerText =
      "Explore the benefits of public transportation though CSS animations! The GIFs, sourced from the web, influenced the vibrant and futuristic color scheme. Notable features include a hover-triggered animated pie chart that represents key data and a timed animation at the bottom, all to promote public transportation through an aesthetically pleasing and interactive lens.";
    link.href =
      "https://elle-art.github.io/CTK303/Assignment2/CSSanimation.html";
  }

  if (btn == "dot1") {
    document.getElementById("design_h3").innerText = "Bonfire";
    document.getElementById("design_h4").innerText =
      "Interactive App Mockup - Honors Contract";
    document.getElementById("designP").innerText =
      "Join the Bonfire! This app unifies communities by highlighting local businesses offering free and low-cost resources. Through Adobe XD, you can interact with this mockup as if the app was downloaded on your phone. Explore it for yourself! ";
  }
  if (btn == "dot2") {
    document.getElementById("design_h3").innerText = "Plantfolio";
    document.getElementById("design_h4").innerText =
      "Landing Page - Composition and Design";
    document.getElementById("designP").innerText =
      "Learn all about plants with Plantfolio, a plant encyclopedia! This captivating landing page, designed in Adobe InDesign, offers a glimpse into a user-friendly and visually appealing platform for exploring the wondrous world of plants.";
  }
  if (btn == "dot3") {
    document.getElementById("design_h3").innerText = "Welcome Week 2023";
    document.getElementById("design_h4").innerText =
      "Facebook Banner - Social Media";
    document.getElementById("designP").innerText =
      "This Facebook banner was designed for ISU Welcome Week 2023. Designed to capture the essence of campus life, it serves as a visual gateway to a week filled with excitement, collaboration, and the spirit of ISU, setting the tone for a great start to a new school year!";
  }
  if (btn == "dot4") {
    document.getElementById("design_h3").innerText = "Recruitment Postcards";
    document.getElementById("design_h4").innerText = "Postcards - Social Media";
    document.getElementById("designP").innerText =
      " As part of my job with the School of IT at ISU, I designed mockups for recruitment postcards. These visual representations not only show the proud achievements of the School of IT but also serve as compelling invitations to prospective students.";
  }
}

function setImages(btn) {
  let image = document.querySelector("#design_img");
  let link = document.querySelector("#bonfire_link");
  if (btn == "dot2" || "dot3" || "dot4") {
    document.getElementById("bonfire_video").style.opacity = "0";
    document.getElementById("bonfire_video").style.zIndex = "-2";
  }
  if (btn == "dot1") {
    image.setAttribute("src", "gallery_imgs/design/bonfire_frame.png");
    link.innerHTML = "Open in browser";
    document.getElementById("bonfire_video").style.opacity = "1";
    document.getElementById("bonfire_video").style.zIndex = "1";
  }
  if (btn == "dot2") {
    image.setAttribute("src", "gallery_imgs/design/plantfolio_ frame.png");
    link.innerHTML = " ";
  }
  if (btn == "dot3") {
    image.setAttribute("src", "gallery_imgs/design/banner_frame.png");
    link.innerHTML = " ";
  }
  if (btn == "dot4") {
    image.setAttribute("src", "gallery_imgs/design/postcard_frame.png");
    link.innerHTML = " ";
  }
}

function get(btn) {
  setBtn(btn);
  setParagraphs(btn);
  setImages(btn);
}

function getGreetings() {
  setBtn("btnA");
  hideCodeElements("wrapBloom");
  hideCodeElements("train");
  hideCodeElements("cali");
  hideCodeElements("star");
  hideCodeElements("collab");
  setCodeFrame("greet");
}

var button = document.getElementById("btnA");
button.addEventListener("click", getGreetings);

function getCollab() {
  setBtn("btnB");
  hideCodeElements("wrapBloom");
  hideCodeElements("train");
  hideCodeElements("cali");
  hideCodeElements("star");
  hideCodeElements("greet");
  setCodeFrame("collab");
}

var button = document.getElementById("btnB");
button.addEventListener("click", getCollab);

function getTracker() {
  setBtn("btn1");
  hideCodeElements("wrapBloom");
  hideCodeElements("train");
  hideCodeElements("cali");
  hideCodeElements("greet");
  hideCodeElements("collab");
  setCodeFrame("star");
}

var button = document.getElementById("btn1");
button.addEventListener("click", getTracker);

function getCali() {
  setBtn("btn2");
  hideCodeElements("wrapBloom");
  hideCodeElements("train");
  hideCodeElements("star");
  hideCodeElements("greet");
  hideCodeElements("collab");
  setCodeFrame("cali");
}

var button = document.getElementById("btn2");
button.addEventListener("click", getCali);

function getBloom() {
  setBtn("btn3");
  hideCodeElements("star");
  hideCodeElements("cali");
  hideCodeElements("train");
  hideCodeElements("greet");
  hideCodeElements("collab");
  setCodeFrame("bloom");
}

var button = document.getElementById("btn3");
button.addEventListener("click", getBloom);

function getTrains() {
  setBtn("btn4");
  hideCodeElements("star");
  hideCodeElements("cali");
  hideCodeElements("bloom");
  hideCodeElements("greet");
  hideCodeElements("collab");
  setCodeFrame("train");
}

var button = document.getElementById("btn4");
button.addEventListener("click", getTrains);

document.addEventListener("DOMContentLoaded", function () {
  const hiddenMenu = document.querySelector(".hiddenMenu");

  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;

    // Adjust the position of the div based on the scroll position
    hiddenMenu.style.transform = `translateY(${scrollY}px)`;
  });
});
