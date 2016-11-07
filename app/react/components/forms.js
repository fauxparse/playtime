import React, { Component } from 'react';
import { VelocityTransitionGroup } from 'velocity-react';
import { buttons } from '../icons';

const idFromName = (name) => name.replace(/\]?\[/g, '_').replace(/\]$/, '')

class Field extends Component {
  constructor(props) {
    super(props);
    this.state = { focus: false }
  }

  render() {
    const { label, type, name, value, onChange } = this.props;
    const id = this.props.id || idFromName(name);
    var attrs = Object.assign({ type: "text", id }, this.props);

    delete attrs.label;
    delete attrs.onChange;
    delete attrs.children;

    return (
      <div className={this.classNames().join(' ')} data-has-value={!!value || (value === 0)} data-focus={this.state.focus}>
        {label && <label htmlFor={id}>{label}</label>}
        <input {...attrs} onChange={this.onChange.bind(this)} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)}/>
      </div>
    );
  }

  onFocus(e) {
    this.setState({ focus: true });
    if (this.props.onFocus) this.props.onFocus(e);
  }

  onBlur(e) {
    this.setState({ focus: false });
    if (this.props.onBlur) this.props.onBlur(e);
  }

  onChange(e) {
    let value = e.target.value;
    if (this.props.type == 'number') {
      value = parseInt(value, 10);
    }
    this.props.onChange(e, value);
  }

  classNames() {
    var classNames = ['field', this.props.className].filter((klass) => !!klass);
    if (this.props.label) classNames.push('with-floating-label');
    return classNames;
  }
}

class RadioButtonField extends Component {
  render() {
    const { name, value, checked, onChange } = this.props;
    const id = this.props.id || `${idFromName(name)}_${value}`;

    return(
      <div className="field radio-button">
        <input type="radio" checked={checked} id={id} name={name} value={value} onChange={this.onChange.bind(this)}/>
        <label htmlFor={id}>
          <svg className="radio" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle className="ring" cx="20" cy="20" r="9" /><circle className="dot" cx="20" cy="20" r="5" /></svg>
          <span>{this.props.children}</span>
        </label>
      </div>
    )
  }

  onChange(e) {
    if (e.target.checked) {
      this.props.onChange(e, this.props.value);
    }
  }
}

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = { menu: false };
  }

  render() {
    return (
      <div className={this.classNames().join(' ')}>
        <div className="trigger" onClick={this.showMenu.bind(this)}>
          <span>{this.selectedText()}</span>
          {buttons.dropDown}
        </div>
        {this.shim()}
        <VelocityTransitionGroup enter={{ animation: { scaleY: 1, opacity: 1 }, style: { scaleY: 0, opacity: 0, translateY: 0 }, duration: 125 }} leave={{ animation: { translateY: '-2rem', opacity: 0 }, duration: 125 }}>
          {this.state.menu && this.menu()}
        </VelocityTransitionGroup>
      </div>
    );
  }

  selected() {
    return this.props.options
      .filter(({ value }) => value == this.props.value)
      .shift();
  }

  selectedIndex() {
    const { options, value } = this.props;
    var index = 0;
    while (index < options.length) {
      if (options[index].value == value) return index;
      index++;
    }
    return -1;
  }

  selectedText() {
    const selected = this.selected();
    return selected && selected.label;
  }

  shim() {
    if (this.state.menu) {
      return <div className="shim" onClick={() => this.setState({ menu: false })}/>
    }
  }

  menu() {
    const { options, value: selected } = this.props;
    return (
      <ul className="menu" style={{ top: `${this.state.selectedIndex * -2.5 - 0.75}rem` }}>
        {options.map(({ label, value }) => <li key={value} data-selected={value == selected} onClick={(e) => this.valueClicked(e, value)}>{label}</li>)}
      </ul>
    )
  }

  showMenu(e) {
    this.setState({ menu: true, selectedIndex: this.selectedIndex() });
  }

  valueClicked(e, value) {
    this.setState({ menu: false });
    this.props.onChange(e, value, { name: this.props.name });
  }

  classNames() {
    var classNames = ['select', this.props.className].filter((klass) => !!klass);
    if (this.props.label) classNames.push('with-floating-label');
    return classNames;
  }
}

class DateField extends Select {
  selected() {
    return this.props.value;
  }

  showMenu(e) {
    this.setState({ menu: true, viewing: this.props.value.clone() });
  }

  selectedText() {
    const { format, value } = this.props;
    return value && value.format(format || 'ddd D MMM, YYYY');
  }

  menu() {
    const { options, value: selected } = this.props,
          today = moment(),
          viewing = this.state.viewing,
          start = viewing.clone().startOf('month'),
          end = viewing.clone().endOf('month');
    var days = Array(end.date() - start.date() + 1).fill().map((_, i) => start.clone().add(i, 'days')),
        weekdays = moment.localeData().weekdaysMin().slice(0);
    weekdays.push(weekdays.shift());
    return (
      <div className="menu">
        <header>
          <button onClick={(e) => this.go(e, -1)}>{buttons.left}</button>
          <span>{this.state.viewing.format('MMMM YYYY')}</span>
          <button onClick={(e) => this.go(e, 1)}>{buttons.right}</button>
        </header>
        <section data-starts-on={start.isoWeekday()}>
          {weekdays.map((day) => <b key={day}>{day.substr(0, 1)}</b>)}
          <del/>
          {days.map((day) => <span key={day.date()} data-selected={day.isSame(selected, 'day')} data-today={day.isSame(today, 'day')} onClick={(e) => this.valueClicked(e, day)}>{day.date()}</span>)}
        </section>
      </div>
    )
  }

  go(e, skip) {
    const newValue = this.state.viewing.clone().add(skip, 'months');
    e.preventDefault();
    this.setState({ viewing: newValue })
  }

  classNames() {
    return super.classNames().concat(['date']);
  }
}

export { DateField, Field, RadioButtonField, Select }
