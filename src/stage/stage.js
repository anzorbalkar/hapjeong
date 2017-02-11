import _ from 'lodash';
import EventEmitter from 'event-emitter';
import Flickity from 'flickity';
import Utils from '../utils';

require('./stage.scss');
const stageTemplate = require('./stage.hbs');

class Stage {
  constructor(photos) {
    this.dom_ = Utils.htmlToElement(stageTemplate({photos}));
    this.events_ = new EventEmitter();
    this.showing_ = false;
    this.flickity_ = new Flickity(this.dom_.querySelector('.flickity-container'), {
      pageDots: false,
      prevNextButtons: false,
      setGallerySize: false,
    });

    this.flickity_.on('select', () => {
      if (this.showing_) {
        return;
      }
      this.events_.emit('photo-scroll', this.flickity_.selectedIndex);
    });

    this.dom_.addEventListener('click', () => {
      this.events_.emit('click');
    });
  }

  get dom() {
    return this.dom_;
  }

  get events() {
    return this.events_;
  }

  get currentIndex() {
    return this.flickity_.selectedIndex;
  }

  show(index) {
    this.showing_ = true;
    Utils.show(this.dom_);

    this.flickity_.resize();
    this.flickity_.select(index, false, true);

    this.showing_ = false;
  }

  hide() {
    Utils.hide(this.dom_);
  }

  goDark() {
    this.dom_.classList.add('stage-go-dark-active');

    _.defer(() => {
      this.dom_.style.backgroundColor = '#000';

      _.delay(() => {
        this.dom_.classList.remove('stage-go-dark-active');
      }, 250);
    });
  }

  goLight() {
    this.dom_.classList.add('stage-go-light-active');

    _.defer(() => {
      this.dom_.style.backgroundColor = '';

      _.delay(() => {
        this.dom_.classList.remove('stage-go-light-active');
      }, 150);
    });
  }

  isDark() {
    return this.dom_.style.backgroundColor != '';
  }

  toggleDarkLight() {
    if (this.isDark()) {
      this.goLight();
    } else {
      this.goDark();
    }
  }
}

export default Stage;
