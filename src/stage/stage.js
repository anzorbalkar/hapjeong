import Flickity from 'flickity';
import Utils from '../utils';

require('./stage.scss');
const stageTemplate = require('./stage.hbs');

class Stage {
  constructor(photos, stageClicked) {
    this.dom_ = Utils.htmlToElement(stageTemplate({photos}));

    this.flickity_ = new Flickity(this.dom_.querySelector('.flickity-container'), {
      pageDots: false,
      prevNextButtons: false,
      setGallerySize: false,
    });

    this.dom_.addEventListener('click', stageClicked);
  }

  get dom() {
    return this.dom_;
  }

  get currentIndex() {
    return this.flickity_.selectedIndex;
  }

  show(index) {
    Utils.show(this.dom_);

    this.flickity_.resize();
    this.flickity_.select(index, false, true);
  }

  hide() {
    Utils.hide(this.dom_);
  }
}

export default Stage;
