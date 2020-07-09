import React, { useState } from "react";
import "./SubscribeForm.css";
import Button from "../common/Button.js";
import Input from "../common/Input.js";

const localStorageAddress = localStorage.getItem("address") || '';
const localStorageTopic = localStorage.getItem("topic") || '';

function SubscribeForm({ subscribe }) {
  const [address, setAddress] = useState(localStorageAddress);
  const [topic, setTopic] = useState(localStorageTopic);

  const storeAddress = address => {
    setAddress(address);
    localStorage.setItem("address", address);
  };

  const storeTopic = topic => {
    setTopic(topic);
    localStorage.setItem("topic", topic);
  };

  return (
    <form className="SubscribeForm-form">
      <label className="SubscribeForm-label">
        <span className="SubscribeForm-label-text">Address</span>
        <Input
          className="SubscribeForm-input"
          placeholder="0x123..."
          value={address}
          onChange={e => storeAddress(e.target.value)}
        />
      </label>
      <label className="SubscribeForm-label">
        <span className="SubscribeForm-label-text">Topic</span>
        <Input
          className="SubscribeForm-input"
          placeholder="0x123..."
          value={topic}
          onChange={e => storeTopic(e.target.value)}
        />
      </label>
      <Button
        className="SubscribeForm-button"
        type="button"
        onClick={() => subscribe(address, topic)}
      >
        Subscribe
      </Button>
    </form>
  );
}

export default SubscribeForm;
