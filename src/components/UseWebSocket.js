// import { useEffect, useState } from 'react';
// import SockJS from 'sockjs-client';
// import { Client } from '@stomp/stompjs';

// const useCustomWebSocket = (url) => {
//     const [client, setClient] = useState(null);
//     const [message, setMessage] = useState('');
//     const [lastMessage, setLastMessage] = useState(null);
//     const [connected, setConnected] = useState(false);

//     useEffect(() => {
//         const socket = new SockJS(url);
//         const stompClient = new Client({
//             webSocketFactory: () => socket,
//             debug: (str) => {
//                 console.log(str);
//             },
//             onConnect: () => {
//                 console.log('WebSocket connected');
//                 setConnected(true);
//                 stompClient.subscribe('/topic/messages', (message) => {
//                     setLastMessage(message.body);
//                 });
//             },
//             onDisconnect: () => {
//                 console.log('WebSocket disconnected');
//                 setConnected(false);
//             }
//         });

//         stompClient.activate();
//         setClient(stompClient);

//         return () => {
//             stompClient.deactivate();
//         };
//     }, [url]);

//     const handleSend = () => {
//         if (client && connected) {
//             client.publish({ destination: '/app/yourEndpoint', body: JSON.stringify({ content: message }) });
//         } else {
//             console.error('WebSocket is not connected');
//         }
//     };

//     return { message, setMessage, lastMessage, connected, handleSend };
// };

// export default useCustomWebSocket;
