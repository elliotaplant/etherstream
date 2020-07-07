import React from 'react'
import './Header.css'

export default function Header() {
  return <header className="Header-header">
    <h1 className="Header-title">Etherstream</h1>
    <div className="Header-paragraph">
      Stream ethereum event logs.
      Made by <a href="http://elliotplant.com">Elliot Plant</a>.
    </div>
  </header>
}
