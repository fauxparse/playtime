import React, { Component } from 'react';
import { connect } from 'react-redux';
import RWRRedux from 'rwr-redux';
import { Link } from 'react-router';
import { AutoSizer, InfiniteLoader, List } from 'react-virtualized';
import fetch from '../fetch';
import Event from '../models/event';

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = { events: [], loading: false };
  }

  componentDidMount() {
    this.load();
  }

  render() {
    const { events, loading } = this.state;
    const loadMore = loading ? (() => {}) : this.load.bind(this);

    return (
      <section className="event-list">
        <InfiniteLoader isRowLoaded={index => index < events.length} loadMoreRows={loadMore} rowCount={events.length}>
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer>
              {({ width, height }) => (
                <List ref={registerChild} onRowsRendered={onRowsRendered} rowRenderer={this.rowRenderer.bind(this)} rowCount={events.length} width={width} height={height} rowHeight={73} />
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </section>
    );
  }

  load({ stopIndex } = {}) {
    const { events, latest } = this.state;

    if (stopIndex === undefined || stopIndex >= events.length - 1) {
      const
        start = latest ? latest.clone().startOf('day').add(1, 'day') : moment().startOf('day'),
        end = start.clone().add(1, 'month').endOf('month'),
        url = `/teams/${this.props.params.team}/events?start=${start.format('YYYY-MM-DD')}&end=${end.format('YYYY-MM-DD')}`;

      this.setState({ loading: true, latest: end });
      fetch(url)
        .then((response) => response.json())
        .then((json) => this.setEvents(json));
    }
  }

  setEvents(json) {
    const events = json.map(attributes => new Event(attributes));
    this.setState({ events: this.state.events.concat(events), loading: false });
  }

  rowRenderer({ index, key, style }) {
    const event = this.state.events[index];
    const { name, start, url } = event;

    return (
      <article key={key} style={style}>
        <Link to={url}>
          <div className="date">
            <span className="day">{start.format('D')}</span>
            <span className="month">{start.format('MMM')}</span>
          </div>
          <div className="details">
            <b>{name}</b>
            <small>{start.format('h:mma')}</small>
          </div>
        </Link>
      </article>
    );
  }
}

const mapStateToProps = (state) => {
  return { };
}

export default connect(mapStateToProps)(EventList);
