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

    this.grid_ = new Grid(config.photos, this.gridItemClicked_.bind(this));
    this.stage_ = new Stage(config.photos, this.stageClicked_.bind(this));
    this.bar_ = new Bar(this.barCloseButtonClicked_.bind(this));
    this.shift_ = new Shift();

    Utils.stampComponents(document, {
      grid: this.grid_,
      stage: this.stage_,
      bar: this.bar_,
      shift: this.shift_,
    });

    this.stage_.hide();
    this.bar_.hide();
  }

  async enterStage_(img) {
    const imgIndex = this.grid_.getImgIndex(img);
    const gridImgBounds = getNodeDimensions(img); // Need to grab these before the grid is hidden.

    // Clear the image out of the clicked on img, and hide the grid.
    this.grid_.whiteoutCellImage(imgIndex);
    this.grid_.hide();

    // Show the shift, and animate it.
    this.shift_.show();
    await this.shift_.toStage(this.grid_.getImgSrc(img), gridImgBounds);

    // Shift animation is done, hide it and show the bar and stage.
    this.shift_.hide();
    this.bar_.show();
    this.stage_.show(imgIndex);

    // Restore the cell image on the grid now.
    // If it doesn't happen now, it will have to be tracked and eventually restored.
    _.defer(() => this.grid_.restoreCellImage(imgIndex));
  }

  async exitStage_() {
    const photoIndex = this.stage_.currentIndex;

    // Hide the bar and stage.
    this.bar_.hide();
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
    this.bar_.toggle();
  }

  barCloseButtonClicked_() {
    this.exitStage_();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});

