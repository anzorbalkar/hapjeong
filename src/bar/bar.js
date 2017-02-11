import _ from 'lodash';
import EventEmitter from 'event-emitter';
import Utils from '../utils';

require('./bar.scss');
const barTemplate = require('./bar.hbs');

class Bar {
  constructor() {
    this.dom_ = Utils.htmlToElement(barTemplate());
    this.events_ = new EventEmitter();

    const closeButtonDom = this.closeButtonDom_;
    Utils.hide(closeButtonDom);
    closeButtonDom.addEventListener('click', () => {
      this.events_.emit('close');
    });
  }

  get dom() {
    return this.dom_;
  }

  get events() {
    return this.events_;
  }

  get closeButtonDom_() {
    return this.dom_.querySelector('.close-button');
  }

  get titleDom_() {
    return this.dom_.querySelector('.title');
  }

  get captionDom_() {
    return this.dom_.querySelector('.caption');
  }

  show() {
    Utils.show(this.dom_);
  }

  hide() {
    Utils.hide(this.dom_);
  }

  goTitleMode() {
    this.dom_.classList.remove('bar-caption-mode');

    Utils.hide(this.captionDom_);
    Utils.hide(this.closeButtonDom_);
    Utils.fadeIn(this.titleDom_, 225);
  }

  goCaptionMode(photo) {
    this.dom_.classList.add('bar-caption-mode');

    Utils.hide(this.titleDom_);

    this.setCaption(photo);
    Utils.fadeIn(this.captionDom_, 225);
    Utils.scaleIn(this.closeButtonDom_, 125);
  }

  setCaption(photo) {
    this.captionDom_.innerText = photo.date;
  }

  fadeIn() {
    this.show();
    this.dom_.style.opacity = 0;
    this.dom_.classList.add('bar-fade-in-active');

    _.defer(() => {
      this.dom_.style.opacity = 1;

      _.delay(() => {
        this.dom_.style.opacity = '';
        this.dom_.classList.remove('bar-fade-in-active');
      }, 250);
    });
  }

  fadeOut() {
    this.dom_.style.opacity = 1;
    this.dom_.classList.add('bar-fade-out-active');

    _.defer(() => {
      this.dom_.style.opacity = 0;

      _.delay(() => {
        this.hide();
        this.dom_.style.opacity = '';
        this.dom_.classList.remove('bar-fade-out-active');
      }, 250);
    });
  }

  toggle() {
    Utils.toggle(this.dom_);
  }
}

export default Bar;
