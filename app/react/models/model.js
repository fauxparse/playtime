export default class Model {
  constructor(attributes = {}) {
    this.attributes = attributes;
  }

  toJSON() {
    var json = {};
    if (this.id) {
      this.json.id = this.id;
    }
    return json;
  }

  setAttributes(attributes) {
    for (var attr in attributes) if (attributes.hasOwnProperty(attr)) {
      this[attr] = attributes[attr];
    }
  }

  set attributes(attributes = {}) {
    this.setAttributes(Object.assign({}, attributes));
  }
}
