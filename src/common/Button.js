import React from 'react';
import './Button.css'

export default function Button({ size = 'medium', color = 'pink', children, className = '', ...props}) {
  return <button className={`${size} ${color} ${className} Button-button`} {...props}>{children}</button>
}
