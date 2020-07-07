import React from 'react';
import './Input.css'

export default function Input({children, className = '', ...props}) {
  return <input className={`${className} Input-input`} {...props} />
}
