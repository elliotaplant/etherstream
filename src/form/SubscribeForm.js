import React, {useState} from 'react';
import './SubscribeForm.css';
import Button from '../common/Button.js'
import Input from '../common/Input.js'

function SubscribeForm({ subscribe }) {
  const [address, setAddress] = useState('');
  const [topic, setTopic] = useState('');
  return (
    <form className="SubscribeForm-form">
      <label className="SubscribeForm-label">
        <span className="SubscribeForm-label-text">Address</span>
        <Input className="SubscribeForm-input" placeholder="0x123..." value={address} onChange={e => setAddress(e.target.value)}/>
      </label>
      <label className="SubscribeForm-label">
        <span className="SubscribeForm-label-text">Topic</span>
        <Input className="SubscribeForm-input" placeholder="0x123..." value={topic} onChange={e => setTopic(e.target.value)}/>
      </label>
      <Button className="SubscribeForm-button" type="button" onClick={() => subscribe(address, topic)}>
        Subscribe
      </Button>
    </form>
  );
}

export default SubscribeForm;
