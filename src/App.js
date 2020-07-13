import React, { useState, useContext } from "react";
import './App.css';
import './colors.css';
import Header from './header/Header.js'
import SubscribeForm from './form/SubscribeForm.js'
import Events from './events/Events.js'
import WebSocketContext from "./client/Context";

function App({ socketConnected }) {
  const [events, setEvents] = useState([]);
  const [subscriptionError, setSubscriptionError] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const wsClient = useContext(WebSocketContext);

  const subscribe = async (address, topic) => {
    console.log('subscribing', address, topic);
    try {
      const subscriptionResponse = await wsClient.subscribe({ address, topic }, ({ event }) => {
        setEvents(events => ([ event, ...events.slice(0, 10), ]))
      });
      setSubscriptions([subscriptionResponse, ...subscriptions]);
    } catch (error) {
      console.error(error);
      setSubscriptionError(error);
    }
  }

  return (
    <>
      <Header />
      {socketConnected ?
        <SubscribeForm subscribe={subscribe} setEvents={setEvents}/> :
        <p style={{textAlign: 'center'}}>Connecting to server</p>
      }
      {subscriptionError && <p>{subscriptionError.message}</p>}
      {subscriptions.map(s => <div key={s.subscriptionID}>{s.subscriptionID}</div>)}
      <Events events={events} />
    </>
  );
}

export default App;
