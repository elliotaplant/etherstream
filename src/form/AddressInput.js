import React from "react";
import CreatableSelect from 'react-select/creatable';
import './AddressInput.css'

export default function AddressInput({ options, placeholder, value, onChange }) {
  return (
    <CreatableSelect
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="AddressInput-AsyncSelect"
      cacheOptions
      isClearable
      options={options}
      formatCreateLabel={(address) => `Use address ${address}`}
    />
  );
}
