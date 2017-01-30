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

  show() {
    this.dom_.style.display = 'flex';
  }

  hide() {
    this.dom_.style.display = 'none';
  }
}

export default Grid;
