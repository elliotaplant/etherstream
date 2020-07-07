import React from 'react';
import './Event.css';

function Event({ event }) {
  return (
    <li className="Event-li">
      <code className="Event-code">
        {event}
      </code>
    </li>
  );
}

export default Event;
