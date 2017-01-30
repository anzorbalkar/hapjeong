class Utils {
  static replaceElement(from, to) {
    from.parentNode.replaceChild(to, from);
  }

  static htmlToElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstChild;
  }
}

export default Utils;
