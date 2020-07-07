import React, {useState} from 'react';
import './App.css';
import './colors.css';
import Header from './header/Header.js'
import SubscribeForm from './form/SubscribeForm.js'

function App() {
  const [events, setEvents] = useState([]);
  window.ws.onmessage = (event) => {
    const formatted = JSON.stringify(JSON.parse(event.data), null, 2);
    setEvents([formatted, ...events])
  }
  return (
    <>
      <Header />
      <SubscribeForm subscribe={subscribe} />
      <ul>
        {events.map(event => <li key={event}><code>{event}</code></li>)}
      </ul>
    </>
  );
}

function subscribe(address, topic) {
  window.ws.send(JSON.stringify({ action: 'subscribe', address, topic }))
}

export default App;
