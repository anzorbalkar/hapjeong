import _ from 'lodash';
import Flickity from 'flickity';
import css from './app.scss';

document.addEventListener("DOMContentLoaded", function(event) { 
  var flkty = new Flickity( '.gallery', {
    pageDots: false,
    prevNextButtons: false,
    setGallerySize: false
  });

  document.querySelector('button').addEventListener('click', function() {
    document.querySelector('.stage-bar').style.display = 'none';
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.thumbnail-grid').style.display = 'flex';
  });

  document.querySelector('.thumbnail-grid').querySelectorAll('img').forEach(i => {
    i.addEventListener('click', function() {
      document.querySelector('.thumbnail-grid').style.display = 'none';
      document.querySelector('.gallery').style.display = 'block';

      flkty.resize();
      flkty.select(parseInt(i.dataset.index), false, true);
      document.querySelector('.gallery').style.opacity = '1.0';
    });
  });

  document.querySelector('.gallery').querySelectorAll('img').forEach(i => {
    i.addEventListener('click', function() {
      //i.parentElement.style.background = getRandomColor();
      var visible = document.querySelector('.stage-bar').style.display == 'block';
      document.querySelector('.stage-bar').style.display = visible ? 'none' : 'block';
    });
  });

});