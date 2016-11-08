import React, { Component } from 'react';
import { connect } from 'react-redux';
import RWRRedux from 'rwr-redux';
import { VelocityTransitionGroup } from 'velocity-react';
import { bullets } from '../icons';
import { DateField, Field, RadioButtonField, Select, TimeField } from '../components/forms';

class NewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        name: 'Event name',
        start: moment('2016-11-28 21:00'),
        end: moment('2016-11-28 22:00'),
        repeat: { step: 1, interval: 'day' }
      },
      page: 'date',
      direction: 1,
      tabIndex: -1
    }
    this.change = this.change.bind(this);
    this.changeMonthlyRepeat = this.changeMonthlyRepeat.bind(this);
  }

  render() {
    const { event, page } = this.state;

    return (
      <div className="new-event modal-container">
        <div className="modal">
          <form>
            <header>
              {this.pages().map((page, index) => <button key={`${page}-button`} data-active={this.state.page == page} onClick={(e) => this.tabClicked(e, page, index)}>{bullets[page]}</button>)}
            </header>
            <VelocityTransitionGroup component="section" {...this.pageAnimation()}>
              {this[`${page}Fields`]()}
            </VelocityTransitionGroup>
          </form>
        </div>
      </div>
    );
  }

  pages() {
    return ['date', 'repeat'];
  }

  tabClicked(e, page, index) {
    const direction = index > this.state.tabIndex ? 1 : -1;
    this.setState({ tabIndex: index, page, direction });
    e.preventDefault();
    e.stopPropagation();
  }

  dateFields() {
    const { event } = this.state;
    return (
      <fieldset key="date">
        <div className="row">
          <Field label="Event name" name="event[name]" value={event.name} onChange={this.change} />
        </div>
        <div className="row">
          <DateField name="event[start]" value={event.start} onChange={this.changeStartDate.bind(this)} />
        </div>
        <div className="row">
          <TimeField name="event[start]" value={event.start} onChange={this.changeStartTime.bind(this)} />
          <span>to</span>
          <TimeField name="event[end]" value={event.end} onChange={this.changeEndTime.bind(this)} />
        </div>
      </fieldset>
    )
  }

  repeatFields() {
    const { event } = this.state;
    return (
      <fieldset key="repeat">
        <RadioButtonField name="event[repeat]" value={false} checked={!event.repeat} onChange={this.change}>Once only</RadioButtonField>
        <RadioButtonField name="event[repeat]" value={{ step: 1, interval: 'week', weekdays: [event.start.day()] }} checked={!!event.repeat} onChange={this.change}>Repeat…</RadioButtonField>
        {this.repeatRules(event)}
        {this.repeatEnds(event)}
      </fieldset>
    )
  }

  repeatRules(event) {
    const repeat = event.repeat;
    if (repeat) {
      const intervals = ['day', 'week', 'month', 'year'].map(
        interval => ({ value: interval, label: repeat.step > 1 ? interval + 's' : interval })
      )
      return (
        <div className="repeat-rules">
          <div className="row">
            <span>Every</span>
            <Field type="number" name="event[repeat][step]" value={repeat.step} onChange={this.change} min="1"/>
            <Select name="event[repeat][interval]" options={intervals} value={repeat.interval} onChange={this.changeRepeatInterval.bind(this)}/>
          </div>
          {this.repeatRuleDetails(event)}
        </div>
      )
    }
  }

  repeatRuleDetails(event) {
    const { repeat, start } = event;
    const locale = moment.localeData();
    switch(repeat.interval) {
      case 'week':
        let weekdays = moment.localeData().weekdays();
        return (
          <div className="weekdays row">
            <span>on</span>
            {weekdays.map((name, index) => <button key={name} value={index} data-selected={repeat.weekdays.indexOf(index) > -1} onClick={(e) => this.toggleWeekday(e, index)} title={name}>{name.substr(0, 1)}</button>)}
          </div>
        )
      case 'month':
        let week = Math.floor(start.date() / 7) + 1;
        let isLast = !start.clone().add(1, 'week').isSame(start, 'month');
        let options = [
          <RadioButtonField key="dom" name="event[repeat][monthly]" value={0} checked={!!repeat.day_of_month} onChange={this.changeMonthlyRepeat}>{`on the ${locale.ordinal(start.date())}`}</RadioButtonField>,
          <RadioButtonField key="wom" name="event[repeat][monthly]" value={week} checked={repeat.week_of_month == week} onChange={this.changeMonthlyRepeat}>{`on the ${locale.ordinal(week)} ${locale.weekdays()[start.day()]}`}</RadioButtonField>
        ];
        if (isLast) {
          options.push(
            <RadioButtonField key="lom" name="event[repeat][monthly]" value={-1} checked={repeat.week_of_month == -1} onChange={this.changeMonthlyRepeat}>{`on the last ${locale.weekdays()[start.day()]}`}</RadioButtonField>
          )
        }

        return options;
    }
  }

  repeatEnds(event) {
    if (event.repeat) {
      var end = event.end || event.start.clone().add(event.repeat.step, event.repeat.interval);
      return (
        <div className="repeat-until">
          <RadioButtonField name="event[repeat][end]" value={false} checked={!event.end} onChange={this.change}>Forever</RadioButtonField>
          <RadioButtonField name="event[repeat][end]" value={end} checked={!!event.end} onChange={this.change}><span>Until</span><DateField name="event[repeat][end]" value={end} onChange={this.change} /></RadioButtonField>
        </div>
      )
    }
  }

  pageAnimation() {
    const { direction } = this.state;
    return {
      enter: {
        duration: 500,
        animation: 'slidePageIn',
        style: {
          translateX: `${direction * 100}%`,
          opacity: 1
        }
      },
      leave: {
        duration: 500,
        animation: direction > 0 ? 'slidePageLeft' : 'slidePageRight',
      }
    }
  }

  change(e, value, data = {}) {
    var { event } = this.state, where = event;
    var parts = (data.name || e.target.name).split(/[\]\[]+/).slice(1, -1);
    while (parts.length > 1) {
      where = where[parts.shift()];
    }
    where[parts[0]] = value;
    this.setState({ event });
  }

  changeTime(moment, time) {
    return moment.clone().set({
      hour: time.hour(),
      minute: time.minute(),
      second: 0,
      millisecond: 0
    });
  }

  changeStartDate(e, value, data = {}) {
    this.setStart(this.changeTime(value, this.state.event.start));
  }

  changeStartTime(e, value, data = {}) {
    this.setStart(this.changeTime(this.state.event.start, value));
  }

  changeEndTime(e, value, data = {}) {
    var { event } = this.state, end = this.changeTime(event.start, value);
    while (end.isBefore(event.start)) {
      end.add(1, 'day');
    }
    event.end = end;
    this.setState({ event });
  }

  setStart(start) {
    var { event } = this.state;
    const duration = event.end.diff(event.start, 'minutes');
    event.start = start;
    event.end = event.start.clone().add(duration, 'minutes');
    this.setState({ event });
  }

  changeMonthlyRepeat(e, value) {
    var { event } = this.state;
    if (value == 0) {
      delete event.repeat.week_of_month;
      event.repeat.day_of_month = event.start.date();
    } else {
      delete event.repeat.day_of_month;
      event.repeat.week_of_month = value;
    }
    this.setState({ event });
  }

  changeRepeatInterval(e, value) {
    var { event } = this.state,
        step = event.repeat ? event.repeat.step : 1,
        repeat = { interval: value, step };
    if (!event.repeat || event.repeat.interval != value) {
      switch(value) {
        case 'day':
          break;
        case 'week':
          repeat.weekdays = [event.start.day()];
          break;
        case 'month':
          repeat.day_of_month = event.start.date();
          break;
      }
      event.repeat = repeat;
      this.setState({ event });
    }
  }

  toggleWeekday(e, value) {
    e.preventDefault();
    var { event } = this.state,
      weekdays = event.repeat.weekdays,
      index = weekdays.indexOf(value);
    if (index > -1) {
      if (weekdays.length > 1) weekdays.splice(index, 1);
    } else {
      weekdays.push(value);
    }
    event.repeat.weekdays = weekdays;
    this.setState({ event });
  }
}

function mapStateToProps(state) {
  return { };
}

export default connect(mapStateToProps)(NewEvent);
