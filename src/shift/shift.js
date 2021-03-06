import _ from 'lodash';
import getNodeDimensions from 'get-node-dimensions';
import Utils from '../utils';

require('./shift.scss');
const shiftTemplate = require('./shift.hbs');

class Shift {
  constructor() {
    this.dom_ = Utils.htmlToElement(shiftTemplate());

    this.animToFrom = null;
    this.animStartTime = 0;
    this.animDuration = 0;
    this.animResolver = null;
    this.animImgFitLerper = null;

    this.img_ = this.dom_.querySelector('img');

    this.stepAnimationFn_ = this.stepAnimation_.bind(this);

    this.resetAnimationState_();
  }

  get dom() {
    return this.dom_;
  }

  show() {
    Utils.show(this.dom_);
  }

  hide() {
    Utils.hide(this.dom_);
  }

  toStage(imgSrc, gridImgBounds) {
    this.img_.src = imgSrc;
    const endBounds = this.getFinalBounds();

    return this.startAnimation_({
      left: [gridImgBounds.left, endBounds.left],
      top: [gridImgBounds.top, endBounds.top],
      width: [gridImgBounds.width, endBounds.width],
      height: [gridImgBounds.height, endBounds.height],
    }, Shift.TO_STAGE_ANIMATION_DURATION_, this.imgLerperCoverToContain_);
  }

  toGrid(imgSrc, gridImgBounds) {
    this.img_.src = imgSrc;
    const endBounds = this.getFinalBounds();

    return this.startAnimation_({
      left: [endBounds.left, gridImgBounds.left],
      top: [endBounds.top, gridImgBounds.top],
      width: [endBounds.width, gridImgBounds.width],
      height: [endBounds.height, gridImgBounds.height],
    }, Shift.TO_GRID_ANIMATION_DURATION_, this.imgLerperContainToCover_);
  }

  getFinalBounds() {
    // For the final bounds of the shift div, get the `contain` fit using the viewport.
    // This will ensure proper bounds are used regardless of device orientation, and image aspect.
    return Shift.getFits_(document.documentElement,
      this.img_.naturalWidth / this.img_.naturalHeight).contain;
  }

  imgLerperCoverToContain_(deltaPercent) {
    const fits = Shift.getFits_(this.dom_, this.img_.naturalWidth / this.img_.naturalHeight);

    // Weight from cover fit to contain fit, over the duration of the animation.
    const dp = deltaPercent;
    return {
      top: (fits.cover.top * (1 - dp)) + (fits.contain.top * dp),
      left: (fits.cover.left * (1 - dp)) + (fits.contain.left * dp),
      width: (fits.cover.width * (1 - dp)) + (fits.contain.width * dp),
      height: (fits.cover.height * (1 - dp)) + (fits.contain.height * dp),
    };
  }

  imgLerperContainToCover_(deltaPercent) {
    const fits = Shift.getFits_(this.dom_, this.img_.naturalWidth / this.img_.naturalHeight);

    // Weight from cover fit to contain fit, over the duration of the animation.
    const dp = deltaPercent;
    return {
      top: (fits.contain.top * (1 - dp)) + (fits.cover.top * dp),
      left: (fits.contain.left * (1 - dp)) + (fits.cover.left * dp),
      width: (fits.contain.width * (1 - dp)) + (fits.cover.width * dp),
      height: (fits.contain.height * (1 - dp)) + (fits.cover.height * dp),
    };
  }

  startAnimation_(toFrom, duration, fitLerper) {
    this.animToFrom = toFrom;
    this.animDuration = duration;
    this.animImgFitLerper = fitLerper;

    // Before animation starts, set each property on this element to its initial animation values.
    _.each(this.animToFrom, (values, propertyName) => {
      this.dom_.style[propertyName] = values[0];
    });

    // Also set intial values of the image fit.
    const imgBounds = this.animImgFitLerper(0);
    this.img_.style.marginTop = imgBounds.top;
    this.img_.style.marginLeft = imgBounds.left;
    this.img_.style.width = imgBounds.width;
    this.img_.style.height = imgBounds.height;

    // Grab a reference to the `resolve` function, for
    // later invocation when the animation is complete.
    const promise = new Promise((resolve) => {
      this.animResolver = resolve;
    });

    // Start the window animation.
    window.requestAnimationFrame(this.stepAnimationFn_);

    return promise;
  }

  stepAnimation_(time) {
    if (!this.animStartTime) {
      this.animStartTime = time;
    }

    // 0 through 1.0
    const deltaPercent = Math.min((time - this.animStartTime) / this.animDuration, 1);

    // Linearlly interpolate from from to to, for each
    // property type which will animate, and set on element.
    _.each(this.animToFrom, (values, propertyName) => {
      this.dom_.style[propertyName] = Shift.lerp_(values[0], values[1], deltaPercent);
    });

    // Get the image tag bounds for this animation step.
    const imgBounds = this.animImgFitLerper(deltaPercent);

    // Apply style property changes to the image.
    this.img_.style.marginTop = imgBounds.top;
    this.img_.style.marginLeft = imgBounds.left;
    this.img_.style.width = imgBounds.width;
    this.img_.style.height = imgBounds.height;

    // Terminal check the animation.
    if (deltaPercent < 1) {
      window.requestAnimationFrame(this.stepAnimationFn_);
    } else {
      const opening = this.animDuration == Shift.TO_STAGE_ANIMATION_DURATION_;

      // The opening animation shows a little pop at the end, the close animation doesn't.
      if (opening) {
        this.dom_.classList.add('shift-pop');

        // Popping animation done via css, 220ms.
        _.delay(() => {
          this.dom_.classList.remove('shift-pop');
          this.animResolver();
          this.resetAnimationState_();
        }, 250);
      } else {
        this.animResolver();
        this.resetAnimationState_();
      }
    }
  }

  resetAnimationState_() {
    this.animToFrom = null;
    this.animStartTime = 0;
    this.animDuration = 0;
    this.animResolver = null;
  }

  static get TO_STAGE_ANIMATION_DURATION_() {
    return 200;
  }

  static get TO_GRID_ANIMATION_DURATION_() {
    return 250;
  }

  static getFits_(container, imageAspect) {
    const containerBounds = getNodeDimensions(container);
    const containerAspect = containerBounds.width / containerBounds.height;

    const heightOfFillByWidth = containerBounds.width / imageAspect;
    const fillByWidth = {
      top: -((heightOfFillByWidth - containerBounds.height) / 2),
      left: 0,
      width: containerBounds.width,
      height: heightOfFillByWidth,
    };

    const widthOfFillByHeight = containerBounds.height * imageAspect;
    const fillByHeight = {
      top: 0,
      left: -((widthOfFillByHeight - containerBounds.width) / 2),
      width: widthOfFillByHeight,
      height: containerBounds.height,
    };

    // Container is wider than image.
    if (imageAspect < containerAspect) {
      return {
        cover: fillByWidth,
        contain: fillByHeight,
      };
    }

    // Container is taller than image.
    return {
      cover: fillByHeight,
      contain: fillByWidth,
    };
  }

  static lerp_(v0, v1, t) {
    return (v0 * (1 - t)) + (v1 * t);
  }
}

export default Shift;
