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
    this.state = { now: moment(), events: {}, loading: false };
  }

  componentDidMount() {
    this.load();
  }

  render() {
    const { events, loading } = this.state;
    const loadMore = loading ? (() => {}) : this.load.bind(this);
    const count = 10000;

    return (
      <section className="event-list">
        <InfiniteLoader isRowLoaded={({ index }) => !!events[index]} loadMoreRows={loadMore} rowCount={count} minimumBatchSize={30}>
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer>
              {({ width, height }) => (
                <List ref={list => registerChild(this.list = list)} onRowsRendered={onRowsRendered} rowRenderer={this.rowRenderer.bind(this)} rowCount={count} width={width} height={height} rowHeight={({ index }) => this.rowHeight(index)} />
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </section>
    );
  }

  rowHeight(index) {
    const { loading } = this.state;
    const events = this.state.events[index];
    return (events === undefined ? 1 : events.length) * 73;
  }

  load({ startIndex, stopIndex } = {}) {
    const { now, events, loading } = this.state;
    const { params } = this.props;

    if (!startIndex) startIndex = 0;
    if (!stopIndex) stopIndex = startIndex + 100;

    const
      start = now.clone().add(startIndex, 'days'),
      end = now.clone().add(stopIndex, 'days'),
      url = `/teams/${params.team}/events?start=${start.format('YYYY-MM-DD')}&end=${end.format('YYYY-MM-DD')}`;

    this.setState({ loading: true, latest: end });
    fetch(url)
      .then((response) => response.json())
      .then((json) => this.setEvents(startIndex, stopIndex, json));
  }

  setEvents(startIndex, stopIndex, json) {
    var { now, events } = this.state;
    var newEvents = {};

    for (var i = startIndex; i <= stopIndex; i++) newEvents[i] = [];

    json.forEach((attributes) => {
      const event = new Event(attributes);
      const index = event.start.diff(now, 'days');
      newEvents[index].push(event);
    })

    this.setState({ events: Object.assign({}, events, newEvents), loading: false });
    this.list && this.list.recomputeRowHeights(startIndex);
  }

  rowRenderer({ index, key, style }) {
    const events = this.state.events[index] || [];

    return (
      <section key={key} style={style}>
        {events.map((event, i) => <EventOccurrence key={i} event={event}/>)}
      </section>
    );
  }
}

const EventOccurrence = ({ event }) => {
  const { name, start, url } = event;

  return (
    <article>
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
  )
}

const mapStateToProps = (state) => {
  return { };
}

export default connect(mapStateToProps)(EventList);
