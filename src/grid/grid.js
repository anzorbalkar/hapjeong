import EventEmitter from 'event-emitter';
import Utils from '../utils';

require('./grid.scss');
const gridTemplate = require('./grid.hbs');

class Grid {
  constructor(photos) {
    this.dom_ = Utils.htmlToElement(gridTemplate({photos}));
    this.events_ = new EventEmitter();

    const imgClicked = (event) => {
      this.events_.emit('item-click', event.target);
    };

    this.dom_.querySelectorAll('img').forEach((img) => {
      img.addEventListener('click', imgClicked);
    });
  }

  get dom() {
    return this.dom_;
  }

  get events() {
    return this.events_;
  }

  getImgSrc(img) { // eslint-disable-line class-methods-use-this
    return img.attributes.src.value || img.dataset.src;
  }

  getImgIndex(img) { // eslint-disable-line class-methods-use-this
    return parseInt(img.dataset.index, 10);
  }

  getImgAtIndex(index) {
    return this.dom_.children[index].querySelector('img');
  }

  whiteoutCellImage(index) {
    const img = this.getImgAtIndex(index);
    img.dataset.src = img.attributes.src.value;
    img.src = '';
  }

  restoreCellImage(index) {
    const img = this.getImgAtIndex(index);
    img.src = img.dataset.src;
    delete img.dataset.src;
  }

  show() {
    Utils.show(this.dom_);
  }

  hide() {
    Utils.hide(this.dom_);
  }
}

export default Grid;
