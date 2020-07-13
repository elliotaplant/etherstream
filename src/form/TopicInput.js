import React from "react";
import CreatableSelect from 'react-select/creatable';
import './TopicInput.css'

export default function TopicInput({ placeholder, value, onChange, topics }) {
  return (
    <CreatableSelect
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="TopicInput-CreatableSelect"
      cacheOptions
      isClearable
      options={topics}
      formatCreateLabel={(address) => `Use topic ${address}`}
    />
  );
}
