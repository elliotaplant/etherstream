const noop = () => {};

export default class WebSocketClient {
  constructor(url, { onOpen = noop, onClose = noop, onError = noop } = {}) {
    this.url = url;
    this.waitingRequests = {};
    this.subscriptions = {};
    this.timeout = 10000;
    this.onOpen = onOpen;
    this.onClose = onClose;
    this.onError = onError;
  }

  connect() {
    this.socket = new WebSocket(this.url);
    this.socket.onopen = () => console.log("connected") || this.onOpen();
    this.socket.onclose = () => this.onClose();
    this.socket.onerror = event => this.onError(event);
    this.socket.onmessage = event => this.handleMessage(JSON.parse(event.data)).catch(console.error);
  }

  async handleMessage(message) {
    if (this.waitingRequests[message.requestID]) {
      try {
        await this.waitingRequests[message.requestID](message);
      } catch (e) {
        console.error(
          `Error handling request from message ${JSON.stringify(message)}`
        );
      }
    } else if (this.subscriptions[message.subscriptionID]) {
      try {
        await this.subscriptions[message.subscriptionID](message);
      } catch (e) {
        console.error(
          `Error handling subscription from message ${JSON.stringify(message)}`
        );
      }
    }
  }

  send(message) {
    return new Promise((resolve, reject) => {
      const requestID = message.requestID || this.makeRequestID();
      message = { requestID, ...message };
      this.waitingRequests[requestID] = (response) => {
        resolve(response);
        delete this.waitingRequests[requestID];
      };
      setTimeout(() => reject(new Error(`Request ${requestID} timed out after ${this.timeout} ms`)), this.timeout);
      this.socket.send(JSON.stringify(message));
    });
  }

  subscribe(message, subscriptionDataHandler) {
    const subscriptionID = message.subscriptionID || this.makeRequestID();
    this.subscriptions[subscriptionID] = subscriptionData => subscriptionDataHandler(subscriptionData);
    return this.send({ action: 'subscribe', subscriptionID, ...message });
  }

  makeRequestID() {
    return `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
  }
}
