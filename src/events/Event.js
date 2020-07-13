import React from 'react';
import './Event.css';

function Event({ event }) {
  return (
    <li className="Event-li">
      <code className="Event-code">
        {JSON.stringify(event, null, 2)}
      </code>
    </li>
  );
}

export default Event;
