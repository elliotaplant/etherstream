import React from 'react';
import './Subscription.css'
import Button from '../common/Button';

export default function Subscription({ id, subscription, contract, topic, unsubscribe }) {
  return <li className="Subscription-li">
    <Button
      color="blue-violet-color-wheel"
      size="small"
      className="Subscription-button"
      onClick={() => unsubscribe(id)}
    >
      Unsubscribe
    </Button>
      <span>{contract}</span>: <span>{topic}</span>
   </li>
}
