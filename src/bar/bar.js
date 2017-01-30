import Utils from '../utils';

require('./bar.scss');
const barTemplate = require('./bar.hbs');

class Bar {
  constructor(barCloseButtonClicked) {
    this.dom_ = Utils.htmlToElement(barTemplate());

    this.dom_.querySelector('button').addEventListener('click', barCloseButtonClicked);
  }

  get dom() {
    return this.dom_;
  }

  show() {
    this.dom_.style.display = 'block';
  }
  hide() {
    this.dom_.style.display = 'none';
  }

  toggle() {
    if (this.dom_.style.display == 'block') {
      this.hide();
    } else {
      this.show();
    }
  }
}

export default Bar;
