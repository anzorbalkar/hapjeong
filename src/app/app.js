import Utils from '../utils';
import Config from '../config';
import Bar from '../bar/bar';
import Grid from '../grid/grid';
import Stage from '../stage/stage';

require('./app.scss');

class App {
  constructor() {
    const config = new Config();

    this.grid_ = new Grid(config.photos, this.gridItemClicked_.bind(this));
    this.stage_ = new Stage(config.photos, this.stageClicked_.bind(this));
    this.bar_ = new Bar(this.barCloseButtonClicked_.bind(this));

    this.stage_.hide();
    this.bar_.hide();
  }

  init() {
    Utils.replaceElement(document.getElementById('bar-placeholder'), this.bar_.dom);
    Utils.replaceElement(document.getElementById('grid-placeholder'), this.grid_.dom);
    Utils.replaceElement(document.getElementById('stage-placeholder'), this.stage_.dom);
  }

  gridItemClicked_(img) {
    this.grid_.hide();
    this.stage_.show(parseInt(img.dataset.index, 10));
  }

  stageClicked_() {
    this.bar_.toggle();
  }

  barCloseButtonClicked_() {
    this.bar_.hide();
    this.stage_.hide();
    this.grid_.show();
  }

  static start() {
    document.addEventListener('DOMContentLoaded', () => {
      const app = new App();
      app.init();
    });
  }
}

App.start();

