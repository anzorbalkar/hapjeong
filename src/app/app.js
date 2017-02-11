import _ from 'lodash';
import getNodeDimensions from 'get-node-dimensions';
import Utils from '../utils';
import Config from '../config';
import Bar from '../bar/bar';
import Grid from '../grid/grid';
import Stage from '../stage/stage';
import Shift from '../shift/shift';

require('./app.scss');

class App {
  constructor() {
    const config = new Config();

    this.photos_ = config.photos;
    this.dom_ = document.querySelector('body');
    this.grid_ = new Grid(this.photos_);
    this.stage_ = new Stage(this.photos_);
    this.bar_ = new Bar();
    this.shift_ = new Shift();

    Utils.stampComponents(document, {
      grid: this.grid_,
      stage: this.stage_,
      bar: this.bar_,
      shift: this.shift_,
    });

    this.stage_.hide();

    this.grid_.events.on('item-click', this.gridItemClicked_.bind(this));
    this.stage_.events.on('click', this.stageClicked_.bind(this));
    this.stage_.events.on('photo-scroll', this.photoScrolled_.bind(this));
    this.bar_.events.on('close', this.barCloseButtonClicked_.bind(this));
  }

  async enterStage_(img) {
    const imgIndex = this.grid_.getImgIndex(img);
    const gridImgBounds = getNodeDimensions(img); // Need to grab these before the grid is hidden.

    // Clear the image out of the clicked on img, and hide the grid.
    this.grid_.whiteoutCellImage(imgIndex);
    this.grid_.hide();

    this.bar_.goCaptionMode(this.photos_[imgIndex]);

    // Show the shift, and animate it.
    this.shift_.show();
    await this.shift_.toStage(this.grid_.getImgSrc(img), gridImgBounds);

    // Shift animation is done, hide it and show the bar and stage.
    this.shift_.hide();
    this.stage_.show(imgIndex);

    // Restore the cell image on the grid now.
    // If it doesn't happen now, it will have to be tracked and eventually restored.
    _.defer(() => this.grid_.restoreCellImage(imgIndex));
  }

  async exitStage_() {
    const photoIndex = this.stage_.currentIndex;

    // Put the bar back in title mode, and hide the stage.
    this.bar_.goTitleMode();
    this.stage_.hide();

    // Clear the image out of the target grid cell.
    this.grid_.whiteoutCellImage(photoIndex);

    // Show the grid so that target grid img bounds can be grabbed, then grab them.
    this.grid_.show();
    const gridImg = this.grid_.getImgAtIndex(photoIndex);
    const gridImgBounds = getNodeDimensions(gridImg);

    // Show the shift and animate it.
    this.shift_.show();
    await this.shift_.toGrid(this.grid_.getImgSrc(gridImg), gridImgBounds);

    // Shift animation is done, restore the image on the target grid cell.
    this.grid_.restoreCellImage(photoIndex);

    // Finish by hiding the shift.
    this.shift_.hide();
  }

  gridItemClicked_(img) {
    this.enterStage_(img);
  }

  stageClicked_() {
    // Hack alert, only when the stage is not dark, up the z-index on the
    // bar such that it can receive click events (for eg on its X button).
    // Note: the bar is initialized with a higher z-index in its css because
    // the default stage mode is not dark.
    if (this.stage_.isDark()) {
      this.bar_.dom.style.zIndex = 1;
    } else {
      this.bar_.dom.style.zIndex = 0;
    }

    this.stage_.toggleDarkLight();
  }

  photoScrolled_(photoIndex) {
    this.bar_.setCaption(this.photos_[photoIndex]);
  }

  barCloseButtonClicked_() {
    this.exitStage_();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});

