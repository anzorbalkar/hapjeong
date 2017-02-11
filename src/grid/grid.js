import Utils from '../utils';

require('./grid.scss');
const gridTemplate = require('./grid.hbs');

class Grid {
  constructor(photos, itemClicked) {
    this.dom_ = Utils.htmlToElement(gridTemplate({photos}));

    const imgClicked = (event) => {
      itemClicked(event.target);
    };

    this.dom_.querySelectorAll('img').forEach((img) => {
      img.addEventListener('click', imgClicked);
    });
  }

  get dom() {
    return this.dom_;
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
