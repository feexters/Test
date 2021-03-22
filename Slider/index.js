"use strict";

/* Get template for slider */
function getSliderTemplate() {
  return `
    <div class="slider">
      <div class="slider__line">
      </div>
      <button class="slider__button slider__button_prev"></button>
      <button class="slider__button slider__button_next"></button>
      <div class="slider__dots-panel"></div>
    </div>
  `;
}

/* Create slide */
function createSlide(src, index, slider) {
  const $slide = document.createElement("img");
  $slide.classList = "slider__image";
  $slide.src = src;

  slider.$dots.push(createDot(index, slider));

  return $slide;
}

/* Create dot */
function createDot(index, slider) {
  const $dot = document.createElement("div");
  $dot.classList = "slider__dot";
  $dot.addEventListener("click", () => {
    /* If it isn't a current dot */
    if (slider.count != index) {
      /* Delete class */
      slider.$dots[slider.count].classList.remove("slider__dot_active");
      if (slider.count < index) {
        /* Change count and click next */
        slider.count = index - 1;
        slider.$buttonNext.click();
      } else {
        /* Change count and click prev */
        slider.count = index + 1;
        slider.$buttonPrev.click();
      }
    }
  });

  slider.$slider
    .querySelector(".slider__dots-panel")
    .insertAdjacentElement("beforeend", $dot);

  return $dot;
}

class Slider {
  constructor(selector, images) {
    this.$slider = this._createSlider(selector);

    this.$sliderLine = this.$slider.querySelector(`.slider__line`);
    this.$buttonNext = this.$slider.querySelector(`.slider__button_next`);
    this.$buttonPrev = this.$slider.querySelector(`.slider__button_prev`);


    this.animation = false;
    this.count = 0;

    /* Create slides */
    this.$dots = [];
    this.$slides = images.map((src, index) => createSlide(src, index, this));

    if (this.$slides.length === 1) {
      /* Create a copy of the slide for correct animation */
      this.$slides.push(createSlide(images[0], 1, this));
      /* Delete the dots panel because it isn't nessesary now */
      this.$slider.querySelector(".slider__dots-panel").remove();
    }

    /* Set first slide */
    this.$sliderLine.insertAdjacentElement("beforeend", this.$slides[0]);
    /* Activate the first dot */
    this.$dots[0].classList.add("slider__dot_active");

    this.$buttonNext.addEventListener("click", this.clickNext.bind(this));
    this.$buttonPrev.addEventListener("click", this.clickPrev.bind(this));
  }

  /* Create slider */
  _createSlider(selector) {
    document
      .querySelector(selector)
      .insertAdjacentHTML("beforeend", getSliderTemplate());
    return document.querySelector(`${selector} .slider`);
  }

  clickNext() {
    if (!this.animation) {
      /* Deactivate the dot of current slide */
      this.$dots[this.count].classList.remove("slider__dot_active");
      this.count++;
      if (this.count > this.$slides.length - 1) this.count = 0;
      /* Activate the dot of next slide */
      this.$dots[this.count].classList.add("slider__dot_active");

      /* Add new slide */
      this.$sliderLine.insertAdjacentElement(
        "beforeend",
        this.$slides[this.count]
      );
      const $currentSlides = this.$slider.querySelectorAll(".slider__image");
      /* Set new position value for the correct position */
      $currentSlides.forEach(($slider) => ($slider.style.left = "0"));
      /* Start animation */

      this._scrollToRight($currentSlides[0], $currentSlides[1]);
    }
  }

  clickPrev() {
    if (!this.animation) {
      /* Deactivate the dot of current slide */
      this.$dots[this.count].classList.remove("slider__dot_active");
      this.count--;
      if (this.count < 0) this.count = this.$slides.length - 1;
      /* Activate the dot of next slide */
      this.$dots[this.count].classList.add("slider__dot_active");

      /* Add new slide */
      this.$sliderLine.insertAdjacentElement(
        "afterbegin",
        this.$slides[this.count]
      );
      const $currentSlides = this.$slider.querySelectorAll(".slider__image");
      /* Set new position value for the correct position */
      $currentSlides.forEach(($slide) => ($slide.style.left = "-100%"));
      /* Start animation */
      this._scrollToLeft($currentSlides[1], $currentSlides[0]);
    }
  }

  /* Scrolling slides from left to right */
  _scrollToRight($currentSlide, $newSlide) {
    let left = 0;

    const scrollAnimation = setInterval(() => {
      this.animation = true;

      if (left <= -100) {
        /* Return old value for the correct position */
        $newSlide.style.left = "0";
        $currentSlide.remove();
        /* Create a new slider */
        clearInterval(scrollAnimation);
        this.animation = false;
        return;
      }

      left -= 5;

      $currentSlide.style.left = `${left}%`;
      $newSlide.style.left = `${left}%`;
    }, 20);
  }

  /* Scrolling slides from right to left */
  _scrollToLeft($currentSlide, $newSlide) {
    let left = -100;

    const scrollAnimation = setInterval(() => {
      this.animation = true;

      if (left >= 0) {
        /* Return old value for the correct position */
        $newSlide.style.left = "0";
        $currentSlide.remove();
        /* Create a new slider */
        clearInterval(scrollAnimation);
        this.animation = false;
        return;
      }

      left += 5;

      $currentSlide.style.left = `${left}%`;
      $newSlide.style.left = `${left}%`;
    }, 20);
  }
}

/* Create slider */
const slider = new Slider(".container", [
  "./img/1.png",
  "./img/2.png",
  "./img/3.png",
  "./img/4.png",
  "./img/5.png",
  "./img/6.png",
  "./img/7.png",
  "./img/8.png",
  "./img/9.png",
  "./img/10.png",
]);
