import React, { useState } from "react";
import "./SubscribeForm.css";
import Button from "../common/Button.js";
import AddressInput from './AddressInput.js'
import TopicInput from './TopicInput.js'
const Web3 = require('web3');
const {contractsByName} = require('./contractsByName')

const web3 = new Web3(`wss://mainnet.infura.io/ws/v3/${process.env.REACT_APP_INFURA_ID}`)
const contractOptions = Object.keys(contractsByName).map(name => ({ label: name, address: contractsByName[name] }));

function fetchABI(address) {
  return fetch(`https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=YourApiKeyToken`)
    .then(response => response.json())
    .then(response => {
      if (response.status === '1') {
        return response
      } else {
        throw new Error(response.result)
      }
    })
    .then(({ result }) => JSON.parse(result));
}

function subscribe(address, topic, contract, addSubscription) {
  let subscription;
  if (contract) {
    subscription = contract.events[topic.label]();
  } else {
    subscription = web3.eth.subscribe('logs', { address: address.address, topics: [topic.label] });
  }
  addSubscription({ subscription, contract: address.label, topic: topic.label })
}

function SubscribeForm({ addSubscription }) {
  const [address, setAddress] = useState(null);
  const [topic, setTopic] = useState(null);
  const [contract, setContract] = useState(null);
  const [contractStatus, setContractStatus] = useState(null);

  const storeAddress = (addressThing) => {
    localStorage.setItem("address", JSON.stringify(addressThing));
    if (addressThing) {
      let lookupAddress = addressThing.label
      if (!addressThing.label.startsWith('0x')) {
        lookupAddress = addressThing.address
      }
      fetchABI(lookupAddress)
        .then(abi => {
          const contract = new web3.eth.Contract(abi, lookupAddress)
          setContract(contract)
          setContractStatus('found')
        })
        .catch(() => {
          setContractStatus('not-found')
        })
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
          options={contractOptions}
          contractStatus={contractStatus}
        />
      </label>
      {contractStatus ?
        (contractStatus === 'found' ?
          <div className="SubscribeForm-contract-status found">Contract ABI found</div> :
          <div className="SubscribeForm-contract-status not-found">Unable to find contract ABI</div>
        ) :
        <div className="SubscribeForm-contract-status">&nbsp;</div>
      }
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
        onClick={() => {
          subscribe(address, topic, contract, addSubscription)
          setTopic(null)
          setContract(null)
          setContractStatus(null)
          setAddress(null)
        }}
      >
        Subscribe
      </Button>
    </form>
  );
}

export default SubscribeForm;
