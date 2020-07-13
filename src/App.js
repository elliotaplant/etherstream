import React, { useState } from "react";
import './App.css';
import './colors.css';
import Header from './header/Header.js'
import SubscribeForm from './form/SubscribeForm.js'
import Events from './events/Events.js'
import Subscriptions from './subscriptions/Subscriptions.js'

function App({ socketConnected }) {
  const [events, setEvents] = useState([]);
  const [subscriptionError, setSubscriptionError] = useState(null);
  const [subscriptions, setSubscriptions] = useState({});

  const unsubscribe = (subscriptionKey) => setSubscriptions(({[subscriptionKey]: removing, ...others}) => others);

  const addSubscription = ({ subscription, contract, topic }) => {
    const subscriptionKey = [contract, topic].join('-');
    setSubscriptions((subscriptions) => ({
      ...subscriptions,
      [subscriptionKey]: { subscription, contract, topic },
    }))

    subscription
      .on('data', (event) => setEvents((events) => ([ event, ...events])))
      .on('error', (err) => {
        console.error(err)
        setSubscriptionError(err)
        unsubscribe(({[subscriptionKey]: removing, ...others}) => others);
      })
  }


  return (
    <>
      <Header />
      {socketConnected ?
        <SubscribeForm addSubscription={addSubscription} /> :
        <p style={{textAlign: 'center'}}>Connecting to server</p>
      }
      {subscriptionError && <p>{subscriptionError.message}</p>}
      <Subscriptions subscriptions={subscriptions} unsubscribe={unsubscribe} />
      <Events events={events} />
    </>
  );
}

export default App;
