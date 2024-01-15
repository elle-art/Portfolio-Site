var images = new Array()
			function preload() {
				for (i = 0; i < preload.arguments.length; i++) {
					images[i] = new Image()
					images[i].src = preload.arguments[i]
				}
			}
			preload(
				"gallery_imgs\pedestal.png",
				"gallery_imgs\code_frame.png",
				"gallery_imgs\audio_tablet.png",
        "gallery_imgs\profile_img.png",
        "gallery_imgs\design\banner_frame.png",
        "gallery_imgs\design\postcard_frame.png",
        "gallery_imgs\design\rsos_frame.png",
        "gallery_imgs\design\sza_frame.png",
        "gallery_imgs\crafts\cover_frame.png",
        "gallery_imgs\crafts\lamps_frame.png",
        "gallery_imgs\crafts\mtray_frame.png",
        "gallery_imgs\crafts\pb_frame.png",
        "gallery_imgs\crafts\plant_frame.png",
        "gallery_imgs\crafts\pooltray_frame.png",
        "gallery_imgs\crafts\pumpkins_frame.png",
        "gallery_imgs\crafts\room_frame.png",
        "gallery_imgs\crafts\sc_frame.png",
        "gallery_imgs\crafts\shelf_frame.png",
        "gallery_imgs\crafts\tarot_frame.png",
        "gallery_imgs\crafts\trash_frame.png"
			)

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

  if (btn == "btn1") {
    document.getElementById("btn2").style.backgroundColor = "#867d6e";
    document.getElementById("btn3").style.backgroundColor = "#867d6e";
  }
  if (btn == "btn2") {
    document.getElementById("btn1").style.backgroundColor = "#867d6e";
    document.getElementById("btn3").style.backgroundColor = "#867d6e";
  }
  if (btn == "btn3") {
    document.getElementById("btn2").style.backgroundColor = "#867d6e";
    document.getElementById("btn1").style.backgroundColor = "#867d6e";
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

  //Code descriptions
  if (frame == "cali") {
    document.getElementById("description1").style.opacity = "0";
    document.getElementById("description1").style.zIndex = "-2";
  }
  if (frame == "bloom" || frame == "wrapBloom") {
    document.getElementById("wrapBloom").style.opacity = "0";
    document.getElementById("bloom").style.opacity = "0";
    document.getElementById("wrapBloom").style.zIndex = "-2";
    document.getElementById("description2").style.opacity = "0";
    document.getElementById("description2").style.zIndex = "-2";
  }
  if (frame == "train") {
    document.getElementById("description3").style.opacity = "0";
    document.getElementById("description3").style.zIndex = "-2";
  }
}

function setCodeFrame(frame) {
  if (document.getElementById(frame).id == frame) {
    document.getElementById(frame).style.opacity = "1";
    document.getElementById(frame).style.zIndex = "1";
  }

  //Code descriptions
  var descriptionClass = document.getElementsByClassName("description");

  if (frame == "cali") {
    document.getElementById("description1").style.opacity = "1";
    document.getElementById("description1").style.zIndex = "1";
  }
  if (frame == "bloom" || frame == "wrapBloom") {
    document.getElementById("wrapBloom").style.opacity = "1";
    document.getElementById("bloom").style.opacity = "1";
    document.getElementById("wrapBloom").style.zIndex = "1";
    document.getElementById("description2").style.opacity = "1";
    document.getElementById("description2").style.zIndex = "1";
  }
  if (frame == "train") {
    document.getElementById("description3").style.opacity = "1";
    document.getElementById("description3").style.zIndex = "1";
  }
}

function hideDesignElements(slide) {
  document.getElementById(slide).style.opacity = "0";
  document.getElementById(slide).style.zIndex = "-2";

    //Design descriptions
    if (slide == "d1") {
      document.getElementById("d1_desc").style.opacity = "0";
      document.getElementById("d1_desc").style.zIndex = "-2";
    }
    if (slide == "d2") {
      document.getElementById("d2_desc").style.opacity = "0";
      document.getElementById("d2_desc").style.zIndex = "-2";
    }
    if (slide == "d3") {
      document.getElementById("d3_desc").style.opacity = "0";
      document.getElementById("d3_desc").style.zIndex = "-2";
    }
    if (slide == "d4") {
      document.getElementById("d4_desc").style.opacity = "0";
      document.getElementById("d4_desc").style.zIndex = "-2";
    }
}

function setDesignFrame(slide) {
  document.getElementById(slide).style.opacity = "1";
  document.getElementById(slide).style.zIndex = "1";

    //Design descriptions
    if (slide == "d1") {
      document.getElementById("d1_desc").style.opacity = "1";
      document.getElementById("d1_desc").style.zIndex = "1";
    }
    if (slide == "d2") {
      document.getElementById("d2_desc").style.opacity = "1";
      document.getElementById("d2_desc").style.zIndex = "1";
    }
    if (slide == "d3") {
      document.getElementById("d3_desc").style.opacity = "1";
      document.getElementById("d3_desc").style.zIndex = "1";
    }
    if (slide == "d4") {
      document.getElementById("d4_desc").style.opacity = "1";
      document.getElementById("d4_desc").style.zIndex = "1";
    }
}

function get(btn, e1, e2, e3, top) {
  setBtn(btn);
  hideDesignElements(e1);
  hideDesignElements(e2);
  hideDesignElements(e3);
  setDesignFrame(top);
}

function getCali() {
  setBtn("btn1");
  hideCodeElements("wrapBloom");
  hideCodeElements("train");
  setCodeFrame("cali");
}

var button = document.getElementById("btn1");
button.addEventListener("click", getCali);

function getBloom() {
  setBtn("btn2");
  hideCodeElements("cali");
  hideCodeElements("train");
  setCodeFrame("bloom");
}

var button = document.getElementById("btn2");
button.addEventListener("click", getBloom);

function getTrains() {
  setBtn("btn3");
  hideCodeElements("cali");
  hideCodeElements("bloom");
  setCodeFrame("train");
}

var button = document.getElementById("btn3");
button.addEventListener("click", getTrains);

document.addEventListener("DOMContentLoaded", function () {
  const hiddenMenu = document.querySelector(".hiddenMenu");

  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;

    // Adjust the position of the div based on the scroll position
    hiddenMenu.style.transform = `translateY(${scrollY}px)`;
  });
});
