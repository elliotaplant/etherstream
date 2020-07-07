import React, {useState} from 'react';
import './App.css';
import './colors.css';
import Header from './header/Header.js'
import SubscribeForm from './form/SubscribeForm.js'
import Events from './events/Events.js'

function App() {
  const [events, setEvents] = useState([]);
  window.ws.onmessage = (event) => {
    const formatted = JSON.stringify(JSON.parse(event.data), null, 2);
    setEvents([formatted, ...events.slice(0, 10)])
  }

  return (
    <>
      <Header />
      <SubscribeForm subscribe={subscribe} />
      <Events events={events} />
    </>
  );
}

function subscribe(address, topic) {
  window.ws.send(JSON.stringify({ action: 'subscribe', address, topic }))
}

export default App;
