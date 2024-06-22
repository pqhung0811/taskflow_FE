import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

class WebSocketManager {
    constructor(url) {
        if (!WebSocketManager.instance) {
            this.url = url;
            this.client = null;
            this.connected = false;
            WebSocketManager.instance = this;
        }

        return WebSocketManager.instance;
    }

    connect() {
        if (!this.client) {
            const socket = new SockJS(this.url);
            this.client = new Client({
                webSocketFactory: () => socket,
                debug: (str) => {
                    console.log(str);
                },
                onConnect: () => {
                    console.log('WebSocket connected');
                    this.connected = true;
                },
                onDisconnect: () => {
                    console.log('WebSocket disconnected');
                    this.connected = false;
                }
            });

            this.client.activate();
        }
    }

    disconnect() {
        if (this.client && this.connected) {
            this.client.deactivate();
        }
    }

    sendMessage(destination, body) {
        if (this.client && this.connected) {
            this.client.publish({ destination, body });
        } else {
            console.error('WebSocket is not connected');
        }
    }
}

const url = `${process.env.REACT_APP_API_URL}/ws`;
const webSocketManager = new WebSocketManager(url);

export default webSocketManager;