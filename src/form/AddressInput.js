import React from "react";
import CreatableSelect from 'react-select/creatable';
import './AddressInput.css'

export default function AddressInput({ contractStatus, options, placeholder, value, onChange }) {
  return (
    <CreatableSelect
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="AddressInput-AsyncSelect"
      cacheOptions
      styles={{
        control: provided => {
          const out = {...provided};
          if (contractStatus === 'found') {
            out.borderColor = 'var(--go-green)';
          }
          return out;
        },
        singleValue: provided => {
          const out = {...provided};
          if (contractStatus === 'found') {
            out.color = 'var(--go-green)'
          }
          return out;
        }
      }}
      isClearable
      options={options}
      formatCreateLabel={(address) => `Use address ${address}`}
    />
  );
}
