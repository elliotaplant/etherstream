import React from 'react';
import Subscription from './Subscription.js'

export default function Subscriptions({ subscriptions, unsubscribe }) {
  return <ul>
    {Object.entries(subscriptions)
      .map(([k, {subscription, contract, topic }]) => <Subscription
        key={k}
        id={k}
        subscription={subscription}
        contract={contract}
        topic={topic}
        unsubscribe={unsubscribe}
      />)
    }
   </ul>
}
