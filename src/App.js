import React, { useState } from "react";
import './App.css';
import './colors.css';
import Header from './header/Header.js'
import Footer from './footer/Footer.js'
import SubscribeForm from './form/SubscribeForm.js'
import Events from './events/Events.js'
import Subscriptions from './subscriptions/Subscriptions.js'

function App() {
  const [events, setEvents] = useState([]);
  const [subscriptionError, setSubscriptionError] = useState(null);
  const [subscriptions, setSubscriptions] = useState({});

  const unsubscribe = (subscriptionKey) => {
    const subscriptionToRemove = subscriptions[subscriptionKey];
    if (subscriptionToRemove) {
      subscriptionToRemove.subscription.unsubscribe(err => {
        if (err) {
          console.error(err)
        }
        setSubscriptions(({[subscriptionKey]: removing, ...others}) => others)
      })
    }
  };

  const addSubscription = ({ subscription, contract, topic }) => {
    const subscriptionKey = [contract, topic].join('-');
    setSubscriptions((subscriptions) => ({
      ...subscriptions,
      [subscriptionKey]: { subscription, contract, topic },
    }))

    subscription
      .on('data', (event) => setEvents((events) => ([ event, ...events.slice(0, 50)])))
      .on('error', (err) => {
        console.error(err)
        setSubscriptionError(err)
        unsubscribe(({[subscriptionKey]: removing, ...others}) => others);
      })
  }


  return (
    <div className="App-container">
      <Header />
      <SubscribeForm addSubscription={addSubscription} />
      {subscriptionError && <p>{subscriptionError.message}</p>}
      <Subscriptions subscriptions={subscriptions} unsubscribe={unsubscribe} />
      <Events events={events} />
      <Footer />
    </div>
  );
}

export default App;
