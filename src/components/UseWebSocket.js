import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const useWebSocket = (onMessageReceived) => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('Connected');
        stompClient.subscribe('/topic/messages', (message) => {
            console.log("mes " + message.body);
            onMessageReceived(message.body);
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, [onMessageReceived]);

  const sendMessage = (destination, message) => {
    if (client && client.connected) {
      client.publish({ destination, body: message });
    }
  };
  
  return { sendMessage };
};

export default useWebSocket;
