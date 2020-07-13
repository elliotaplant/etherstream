import React, { useState } from "react";
import "./SubscribeForm.css";
import Button from "../common/Button.js";
import AddressInput from './AddressInput.js'
import TopicInput from './TopicInput.js'
const Web3 = require('web3');

const web3 = new Web3(`wss://mainnet.infura.io/ws/v3/${process.env.REACT_APP_INFURA_ID}`)
const localStorageAddress = localStorage.getItem("address") || '';
const localStorageTopic = localStorage.getItem("topic") || '';

function fetchABI(address) {
  return fetch(`https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=YourApiKeyToken`)
    .then(response => response.json())
    .then(({ result }) => JSON.parse(result));
}

function subscribe(address, topic, contract, setEvents) {
  if (contract) {
    contract.events[topic.label]((err, event) => {
      if (err) {
        console.error(err)
      } else {
        setEvents(events => ([event, ...events]))
      }
    })
  } else {
    web3.eth.subscribe('logs', { address: address.address, topics: [topic.label] }, (err, event) => {
      if (err) {
        console.error(err)
      } else {
        setEvents(events => ([event, ...events]))
      }
    })
  }
}

function SubscribeForm({ setEvents }) {
  const [address, setAddress] = useState(localStorageAddress && JSON.parse(localStorageAddress));
  const [topic, setTopic] = useState(localStorageTopic && JSON.parse(localStorageTopic));
  const [contract, setContract] = useState(null);

  const storeAddress = (addressThing) => {
    localStorage.setItem("address", JSON.stringify(addressThing));
    if (addressThing) {
      if (!addressThing.label.startsWith('0x')) {
        fetchABI(addressThing.address)
        .then(abi => {
          const contract = new web3.eth.Contract(abi, addressThing.address)
          setContract(contract)
        })
      }
    }
    setAddress(addressThing);
  };

  let topics = []
  if (contract) {
    topics = Object.keys(contract.events)
      .filter(event => Number.isNaN(Number(event)) && !event.includes('('))
      .map(event => ({ label: event }))
  }

  const storeTopic = topic => {
    localStorage.setItem("topic", JSON.stringify(topic));
    setTopic(topic);
  };

  return (
    <form className="SubscribeForm-form">
      <label className="SubscribeForm-label">
        <span className="SubscribeForm-label-text">Contract</span>
        <AddressInput
          className="SubscribeForm-input"
          placeholder="Contract name (DAI) or address (0x123...)"
          value={address}
          onChange={e => storeAddress(e)}
        />
      </label>
      <label className="SubscribeForm-label">
        <span className="SubscribeForm-label-text">Topic</span>
        <TopicInput
          className="SubscribeForm-input"
          placeholder="Topic name (Transfer) or signature (0x123...)"
          value={topic}
          topics={topics}
          onChange={e => storeTopic(e)}
        />
      </label>
      <Button
        className="SubscribeForm-button"
        disabled={!(address && topic)}
        type="button"
        onClick={() => subscribe(address, topic, contract, setEvents)}
      >
        Subscribe
      </Button>
    </form>
  );
}

export default SubscribeForm;
