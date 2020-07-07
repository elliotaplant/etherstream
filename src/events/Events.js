import React from 'react';
import './Events.css';
import Event from './Event.js'

function Events({ events = [] }) {
  return (
    <ul className="Events-ul">
      {events.map(event => <Event key={event.id} event={event} />)}
    </ul>
  );
}

export default Events;
