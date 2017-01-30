import Flickity from 'flickity';
import Utils from '../utils';

require('./stage.scss');
const stageTemplate = require('./stage.hbs');

class Stage {
  constructor(photos, stageClicked) {
    this.dom_ = Utils.htmlToElement(stageTemplate({photos}));

    this.flickity_ = new Flickity(this.dom_, {
      pageDots: false,
      prevNextButtons: false,
      setGallerySize: false,
    });

    this.dom_.addEventListener('click', stageClicked);
  }

  get dom() {
    return this.dom_;
  }

  show(index) {
    this.dom_.style.display = 'block';

    this.flickity_.resize();
    this.flickity_.select(index, false, true);

    this.dom_.style.opacity = '1.0';
  }

  hide() {
    this.dom_.style.opacity = '0';
    this.dom_.style.display = 'none';
  }
}

export default Stage;
