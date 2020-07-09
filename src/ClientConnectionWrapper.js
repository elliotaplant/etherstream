import React, {useState} from 'react';
import WebSocketContext from './client/Context';
import WebSocketClient from './client/WebSocketClient';
import App from './App';

const apiURL = process.env.NODE_ENV === 'production' ? 'ws://api.etherstream.io' : 'ws://localhost:8080';

let singletonWebsocketClient = null;

export default function ClientConnectionWrapper() {
  const [socketConnected, setSocketConnected] = useState(false)

  if (!singletonWebsocketClient) {
    singletonWebsocketClient = new WebSocketClient(apiURL);
    singletonWebsocketClient.connect()
  }

  singletonWebsocketClient.onOpen = () => setSocketConnected(true)
  singletonWebsocketClient.onClose = () => setSocketConnected(false);

  return <WebSocketContext.Provider value={singletonWebsocketClient}>
    <App socketConnected={socketConnected}/>
  </WebSocketContext.Provider>;
}
