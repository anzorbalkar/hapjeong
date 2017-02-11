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
}

export default Utils;
