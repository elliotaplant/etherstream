import React from 'react';
import './Button.css'

export default function Button({children, className = '', ...props}) {
  return <button className={`${className} Button-button`} {...props}>{children}</button>
}
