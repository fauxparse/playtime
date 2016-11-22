import Model from './model';

class Event extends Model {
  toJSON() {
    return Object.assign({}, super.toJSON(), {
      name: this.name,
      start: this.start,
      end: this.end,
      repeat: this.repeat
    })
  }

  get key() {
    return `Event#${this.id}@${this.start.format('YYYY-MM-DD')}`;
  }

  get url() {
    var path = `/teams/${this.team}/events/`;
    if (this.id) path += `${this.id}/${this.start.format('YYYY-MM-DD')}`;
    return path;
  }

  setAttributes(attributes) {
    if (attributes.time_zone) {
      this.timeZone = attributes.time_zone;
      delete attributes.time_zone;
    }
    super.setAttributes.call(this, attributes);
  }

  set name(value) {
    this._name = value;
  }

  get name() {
    return this._name || '';
  }

  set timeZone(value) {
    this._timeZone = value;
  }

  get timeZone() {
    return this._timeZone || moment.tz().zoneName();
  }

  set start(value) {
    this._start = this.parseTime(value);
  }

  get start() {
    return this._start;
  }

  set end(value) {
    this._end = this.parseTime(value);
  }

  get end() {
    return this._end;
  }

  set repeat(value) {
    if (value) {
      value = Object.assign({}, value);
      if (value.until) {
        value.until = this.parseTime(value.until);
      }
    }

    this._repeat = value || false;
  }

  get repeat() {
    return this._repeat || false;
  }

  parseTime(value) {
    if (!value || moment.isMoment(value)) {
      return value;
    } else {
      return moment.tz(value.toString(), this.timeZone);
    }
  }
}

export default Event;
