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
    Utils.show(this.dom_);
  }
  hide() {
    Utils.hide(this.dom_);
  }

  toggle() {
    Utils.toggle(this.dom_);
  }
}

export default Bar;
