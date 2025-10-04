/**
 * Close navbar when a nav link is clicked (for mobile/hamburger menu)
 */
const navLinks = document.querySelectorAll('.navbar-link');
navLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    if (navbar.classList.contains('active')) {
      navbar.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('nav-active');
    }
  });
});
'use strict';

/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});

    // Image modal (click to enlarge)
    (function() {
      const modal = document.getElementById('imageModal');
      if (!modal) return;
      const overlay = modal.querySelector('[data-image-modal-overlay]');
      const imgEl = modal.querySelector('.image-modal-img');
      const closeBtn = modal.querySelector('.image-modal-close');

      // Select images inside menu items (adjust selector if necessary)
      const menuImages = document.querySelectorAll('.menu-img img');

      const openModal = (src, alt) => {
        imgEl.src = src;
        imgEl.alt = alt || '';
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      };

      const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        imgEl.src = '';
        imgEl.alt = '';
        document.body.style.overflow = '';
      };

      menuImages.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e) => {
          openModal(img.src, img.alt);
        });
      });

      // Also open modal when menu name is clicked — find the image in the same menu-item
      const menuNames = document.querySelectorAll('.menu-name');
      menuNames.forEach(name => {
        name.style.cursor = 'pointer';
        name.addEventListener('click', (e) => {
          // prevent default if it's an anchor
          if (e.target.tagName.toLowerCase() === 'a') e.preventDefault();
          const item = name.closest('.menu-item');
          if (!item) return;
          const img = item.querySelector('.menu-img img');
          if (img) openModal(img.src, img.alt || name.textContent.trim());
        });
      });

      overlay.addEventListener('click', closeModal);
      closeBtn.addEventListener('click', closeModal);

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
          closeModal();
        }
      });
    })();


