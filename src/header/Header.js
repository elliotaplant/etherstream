import React from 'react'
import './Header.css'

export default function Header() {
  return <header className="Header-header">
    <h1 className="Header-title">Etherstream</h1>
    <div className="Header-paragraph">Stream event logs from any ethereum contract</div>
  </header>
}
