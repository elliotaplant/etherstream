import React, { useContext } from "react";
import AsyncCreatableSelect from 'react-select/async-creatable';
import './AddressInput.css'
import WebSocketContext from "../client/Context";

export default function AddressInput({ placeholder, value, onChange }) {
  const wsClient = useContext(WebSocketContext);

  const promiseOptions = async (inputValue) => {
    const response = await wsClient.send({ action: 'contractLookup', payload: inputValue })
    return response.result.map(({ address, contractName: label }) => ({ address, label }))
  }

  return (
    <AsyncCreatableSelect
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="AddressInput-AsyncSelect"
      cacheOptions
      isClearable
      loadOptions={promiseOptions}
      formatCreateLabel={(address) => `Use address ${address}`}
    />
  );
}
