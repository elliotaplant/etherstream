import React, {useState} from 'react';
import './App.css';
import './colors.css';
import Header from './header/Header.js'
import SubscribeForm from './form/SubscribeForm.js'
import Events from './events/Events.js'

function App() {
  const [events, setEvents] = useState(defaultEvents);
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

const defaultEvents = [
  JSON.stringify({
    "removed": false,
    "logIndex": 122,
    "transactionIndex": 86,
    "transactionHash": "0x41de23c23f4ad52e592fcca96032bee41aa59521d448e98e22adca5e22fc2ae8",
    "blockHash": "0xf1143e12634b7f748696b3f731ef0327c750f12c5e220914c977540d1d43c3ac",
    "blockNumber": 10413545,
    "address": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    "data": "0x000000000000000000000000000000000000000000002fa54641bae8aaa00000",
    "topics": [
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "0x0000000000000000000000005d3a536e4d6dbd6114cc1ead35777bab948e3643", "0x0000000000000000000000000000000000000000000000000000000000000000"
    ],
    "id": "log_b78ff9ee"
  }, null, 2)
]

export default App;
