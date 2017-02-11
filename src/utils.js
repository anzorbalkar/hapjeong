import _ from 'lodash';

class Utils {
  static replaceElement(from, to) {
    from.parentNode.replaceChild(to, from);
  }

  static htmlToElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstChild;
  }

  static stampComponents(dom, componentMap) {
    _.each(dom.querySelectorAll('[data-component]'), (e) => {
      Utils.replaceElement(e, componentMap[e.dataset.component].dom);
    });
  }

  static hide(dom) {
    dom.dataset.display = window.getComputedStyle(dom).display;
    dom.style.display = 'none';
  }

  static show(dom) {
    // TODO(anzorbalkar): Handle if element hidden by default.
    dom.style.display = '';
  }

  static fadeIn(dom, duration, done) {
    let last = +new Date();
    const tick = () => {
      dom.style.opacity = (+dom.style.opacity) + ((new Date() - last) / duration);
      last = +new Date();

      if (+dom.style.opacity < 1) {
        window.requestAnimationFrame(tick);
      } else {
        dom.style.opacity = '';

        if (done) {
          done.call(dom);
        }
      }
    };

    Utils.show(dom);
    dom.style.opacity = 0;
    tick();
  }

  static scaleIn(dom, duration, done) {
    let last = +new Date();
    const tick = () => {
      dom.dataset.scaleIn = (+dom.dataset.scaleIn) + ((new Date() - last) / duration);
      last = +new Date();

      dom.style.transform = `scale(${dom.dataset.scaleIn})`;
      if (+dom.dataset.scaleIn < 1) {
        window.requestAnimationFrame(tick);
      } else {
        dom.style.transform = '';

        if (done) {
          done.call(dom);
        }
      }
    };

    Utils.show(dom);
    dom.dataset.scaleIn = 0;
    dom.style.transform = 'scale(0)';
    tick();
  }
}

export default Utils;
